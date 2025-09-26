import '../styles/scenes/Contact.css';

import { useNavigate } from 'react-router-dom';

export default function Contact () {

    const navigate = useNavigate();

    return (
        <div className="contact">
            <div className="page-title">CONTACT ME</div>

            <div className='contact-container'>
                <div className="contact-info">
                    <div><b>Email:</b>  <a href="mailto:contact.pmoreau@gmail.com">contact.pmoreau@gmail.com</a></div>
                    <div><b>Phone:</b>  647-309-3474</div>
                    <div><b>Location:</b>  Toronto, ON, Canada</div>
                    <div><b>LinkedIn:</b>  <a href="https://www.linkedin.com/in/pierre-moreau/" target="_blank">linkedin.com/in/pierre-moreau</a></div>
                    <div><b>GitHub:</b>  <a href="https://github.com/ieBeau" target="_blank">github.com/ieBeau</a></div>
                </div>

                {/* Direct the user to the home page */}
                <form onSubmit={(e) => { e.preventDefault(); navigate('/'); }} className="contact-form">
                    <label htmlFor="firstName">First Name:</label>
                    <input id="firstName" type="text" name="firstName" required />

                    <label htmlFor="lastName">Last Name:</label>
                    <input id="lastName" type="text" name="lastName" required />

                    <label htmlFor="phone">Phone Number:</label>
                    <input id="phone" type="tel" name="phone" required />

                    <label htmlFor="email">Your Email:</label>
                    <input id="email" type="email" name="email" required />

                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" rows="5" required></textarea>

                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}