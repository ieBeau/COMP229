import '../styles/scenes/Register.css';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../context/UserContext';

export default function Register () {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
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
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={form.name}
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