/**
 * Register component renders a user registration page with a form for username, email, and password.
 * 
 * The component manages local form state, handles input changes, validates required fields, and
 * submits the form via a register function obtained from the UserContext. On successful registration
 * it navigates the user to the home route. The component also imports associated styles for layout.
 * 
 * @component
 * @returns {JSX.Element} The rendered registration page containing username, email, and password inputs and a submit button.
 * 
 * @remarks
 * - Uses React useState for form state management.
 * - Uses react-router-dom useNavigate for post-registration navigation.
 * - Uses a register method from a UserContext (via useUser) which is expected to return a Promise<boolean> indicating success.
 * - Prevents submission if any required field is empty.
 * 
 * @example
 * // Usage in a React Router setup
 * <Route path="/register" element={<Register />} />
 */

import '../styles/scenes/Register.css';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../context/UserContext';

export default function Register () {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const { register } = useUser();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.username || !form.email || !form.password) return;

        register(form)
        .then(success => {
            if (success) navigate('/');
        });
    };

    return (
        <div className="login">
            <div className="page-title">REGISTER</div>

            <div className='login-container'>

                <form onSubmit={handleSubmit} className="login-form">
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="text"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}