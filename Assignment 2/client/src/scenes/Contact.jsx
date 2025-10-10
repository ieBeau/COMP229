/**
 * Contact component renders a contact page with personal contact information and a contact form.
 * 
 * The form collects user's first name, last name, phone number, email, and a message.
 * On submission, the form data is logged to the console and the user is redirected to the home page.
 * 
 * @component
 * @returns {JSX.Element} The rendered contact page with contact information and a form.
 * 
 * @example
 * // Usage in a React Router setup
 * <Route path="/contact" element={<Contact />} />
 */

import '../styles/scenes/Contact.css';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Contact () {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log(formData);

        fetch('http://localhost:3000/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: formData.firstName,
                lastname: formData.lastName,
                email: formData.email
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="contact">
            <div className="page-title">CONTACT ME</div>

            <div className='contact-container'>
                <div className="contact-info">
                    <div><b>Email:</b>  <a href="mailto:contact.pmoreau@gmail.com">contact.pmoreau@gmail.com</a></div>
                    <div><b>Phone:</b>  647-309-3474</div>
                    <div><b>Location:</b>  Toronto, ON, Canada</div>
                    <div><b>LinkedIn:</b>  <a href="https://www.linkedin.com/in/pierre-moreau/" target="_blank" rel="noopener noreferrer">linkedin.com/in/pierre-moreau</a></div>
                    <div><b>GitHub:</b>  <a href="https://github.com/ieBeau" target="_blank" rel="noopener noreferrer">github.com/ieBeau</a></div>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="phone">Phone Number:</label>
                    <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">Your Email:</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}