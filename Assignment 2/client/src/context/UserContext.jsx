// UserContext.js
import { createContext, useContext, useEffect, useState } from "react";

// Context
const UserContext = createContext();

// Provider
export const UserProvider = ({ children }) => {
    
    const getUserFromLocalStorage = () => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const email = localStorage.getItem('email');
        const admin = localStorage.getItem('admin');
        return token && username ? { username, email, admin } : null;
    }

    const [user, setUser] = useState(getUserFromLocalStorage());
    

    useEffect(() => {
        setUser(getUserFromLocalStorage());
    }, []);

    // let username = user ? user.username : null;
    // let email = user ? user.email : null;
    let isAdmin = user ? user.admin === 'true' : false;

    const login = (form) => {
        const response = fetch('http://localhost:3000/auth/signin', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: form.email,
                password: form.password
            })
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.user.name);
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('admin', data.user.admin);

            if (data.token && data.user.name) {
                setUser({ username: data.user.name, email: data.user.email, admin: data.user.admin.toString() });
                return true;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

        return response;
    }

    const logout = () => setUser(null);

    const register = (form) => {
        const response = fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: form.name,
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

    return (
        <UserContext.Provider value={{ user, isAdmin, login, logout, register }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for convenience
export const useUser = () => useContext(UserContext);