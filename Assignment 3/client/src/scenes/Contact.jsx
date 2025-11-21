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

import { useState } from 'react';

import { fetchApi } from '../utils/api';
import { useUser } from '../context/UserContext';
import { useData } from '../context/DataContext';

import ContactMessages from '../components/misc/ContactMessages';

export default function Contact () {

    const { user, isAdmin } = useUser();
    const { setContacts } = useData();

    const defaultForm = {
        firstname: user?.username.split(' ')[0] || '',
        lastname: user?.username.split(' ')[1] || '',
        phone: '',
        email: user?.email || '',
        message: ''
    };

    const [form, setForm] = useState(defaultForm);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("firstname", form.firstname);
        formData.append("lastname", form.lastname);
        formData.append("phone", form.phone.trim() === '' ? null : form.phone);
        formData.append("email", form.email);
        formData.append("message", form.message);

        fetchApi(`/contacts`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);

            setContacts(prevContacts => [...prevContacts, data]);
            setForm(defaultForm);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const [showMessages, setShowMessages] = useState(false);
    const toggleViewMessages = () => {
        setShowMessages(!showMessages);
    }

    return (
        <div className="contact">
            
            { showMessages && <ContactMessages onClose={toggleViewMessages} />}

            <div className="page-title">CONTACT ME</div>
            
            { isAdmin && <button className="admin-banner" onClick={toggleViewMessages}>See Messages</button> }

            <div className='contact-container'>
                <div className="contact-info">
                    <div><b>Email:</b>  <a href="mailto:contact.pmoreau@gmail.com">contact.pmoreau@gmail.com</a></div>
                    <div><b>Phone:</b>  647-309-3474</div>
                    <div><b>Location:</b>  Toronto, ON, Canada</div>
                    <div><b>LinkedIn:</b>  <a href="https://www.linkedin.com/in/pierre-moreau/" target="_blank" rel="noopener noreferrer">linkedin.com/in/pierre-moreau</a></div>
                    <div><b>GitHub:</b>  <a href="https://github.com/ieBeau" target="_blank" rel="noopener noreferrer">github.com/ieBeau</a></div>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                    <label htmlFor="firstname">First Name:</label>
                    <input
                        id="firstname"
                        type="text"
                        name="firstname"
                        value={form.firstname}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="lastname">Last Name:</label>
                    <input
                        id="lastname"
                        type="text"
                        name="lastname"
                        value={form.lastname}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="phone">Phone Number:</label>
                    <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                    />

                    <label htmlFor="email">Your Email:</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={form.message}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}