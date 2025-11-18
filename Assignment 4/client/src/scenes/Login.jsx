import '../styles/scenes/Login.css';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useUser } from '../context/UserContext';

export default function Login () {

    const navigate = useNavigate();
    
    const emailEl = document.getElementById('email');
    const notFoundEl = document.getElementById('not-found');

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (notFoundEl) notFoundEl.hidden = true;
    };

    const { login } = useUser();

    const handleSubmit = (e) => {
        e.preventDefault();

        login(form)
        .then(success => {
            if (success) navigate('/');
        })
        .catch(error => {
            if (emailEl) emailEl.focus();
            if (notFoundEl) {
                notFoundEl.innerText = error.message || 'User Not Found!';
                notFoundEl.hidden = false;
            }
        });
    };

    return (
        <div className="login">
            <div className="page-title">LOGIN</div>

            <div className='login-container'>

                <form onSubmit={handleSubmit} className="login-form">
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

                    <button type="submit">Send</button>
                    <span id='not-found' hidden />
                </form>

            </div>
        </div>
    )
}