/**
 * UserContext provides authentication state and helper actions to the application.
 *
 * The UserProvider component maintains and exposes the current authenticated user (sourced from localStorage),
 * an isAdmin flag, and methods for login, logout, and registration. On mount it attempts to validate an
 * existing authentication token (via fetchAuth) and synchronizes localStorage with the React state.
 *
 * Behavior summary:
 * - Persists user data (username, email, admin) to localStorage on successful sign-in.
 * - Clears stored user data on sign-out.
 * - Validates an existing session token on component mount and logs out if invalid.
 * - Exposes convenience hook useUser() to consume the context in child components.
 *
 * Exposed context shape:
 * - user: { username: string, email: string, admin: boolean } | null
 * - isAdmin: boolean
 * - login(form): Promise<boolean|any>  // posts credentials to /signin, stores user on success
 * - logout(): void                     // calls /signout and clears state/storage
 * - register(form): Promise<any>       // creates a user via /users then logs in
 *
 * @component
 * @returns {JSX.Element} The UserContext.Provider wrapping children and providing auth state and actions.
 *
 * @example
 * // Wrap the application with the provider
 * <UserProvider>
 *   <App />
 * </UserProvider>
 *
 * @example
 * // Consume the context in a component
 * const { user, isAdmin, login, logout, register } = useUser();
 */

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