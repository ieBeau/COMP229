// UserContext.js
import { createContext, useContext, useEffect, useState } from "react";

import { fetchApi, fetchAuth } from "../utils/api";

// Context
const UserContext = createContext();

// Provider
export const UserProvider = ({ children }) => {
    
    const storeUserToLocalStorage = (user) => {
        localStorage.setItem('username', user.username);
        localStorage.setItem('email', user.email);
        localStorage.setItem('admin', user.admin);
    }

    const clearUserFromLocalStorage = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('admin');
        return null;
    }

    const getUserFromLocalStorage = () => {
        const username = localStorage.getItem('username');
        const email = localStorage.getItem('email');
        const admin = localStorage.getItem('admin') === 'true';

        return username ? { username, email, admin } : null;
    }

    const [user, setUser] = useState(getUserFromLocalStorage());

    useEffect(() => {
        const validateUser = async () => {
            const user = await validateToken();

            if (!user) return logout();

            setUser(getUserFromLocalStorage());
        };
        validateUser();
    }, []);

    let isAdmin = user ? user.admin === true : false;

    const login = (form) => {
        const response = fetchAuth(`/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: form.email,
                password: form.password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) throw new Error(data.error);

            const userData = data.user;

            storeUserToLocalStorage(userData);

            if (userData.username) {
                setUser({ username: userData.username, email: userData.email, admin: userData.admin });
                return true;
            }
        });

        return response;
    }

    const logout = () => {
        fetchAuth('/signout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(_ => {
            clearUserFromLocalStorage();
            setUser(null);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const register = (form) => {
        const response = fetchApi(`/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: form.username,
                email: form.email,
                password: form.password
            })
        })
        .then(response => response.json())
        .then(_ => {
            return login({ email: form.email, password: form.password });
        })
        .catch(error => {
            console.error('Error:', error);
        });

        return response;
    }
    
    const validateToken = async () => {
        try {
            const response = await fetchAuth(`/validate`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) return null;
            
            const data = await response.json();
            return data.user;
        } catch (err) {
            return null;
        }
    }

    return (
        <UserContext.Provider value={{ user, isAdmin, login, logout, register }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for convenience
export const useUser = () => useContext(UserContext);