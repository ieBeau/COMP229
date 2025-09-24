import '../styles/scenes/Contact.css';

import { useNavigate } from 'react-router-dom';

export default function Contact () {

    const navigate = useNavigate();

    return (
        <div className="contact">
            <h1>Contact Me</h1>

            <div className='contact-container'>
                <div className="contact-info">
                    <div><b>Email:</b> contact.pmoreau@gmail.com</div>
                    <div><b>Phone:</b> 647-309-3474</div>
                    <div><b>Address:</b> Markham, ON, Canada</div>
                    <div><b>LinkedIn:</b> <a href="https://www.linkedin.com/in/pierre-moreau/" target="_blank">linkedin.com/in/pierre-moreau</a></div>
                    <div><b>GitHub:</b> <a href="https://github.com/ieBeau" target="_blank">github.com/ieBeau</a></div>
                </div>

                {/* Direct the user to the home page */}
                <form onSubmit={(e) => { e.preventDefault(); navigate('/'); }} className="contact-form">
                    <label><b>First Name:</b></label>
                    <input type="text" name="firstName" required />

                    <label><b>Last Name:</b></label>
                    <input type="text" name="lastName" required />

                    <label><b>Phone Number:</b></label>
                    <input type="tel" name="phone" required />

                    <label><b>Your Email:</b></label>
                    <input type="email" name="email" required />

                    <label><b>Message:</b></label>
                    <textarea name="message" rows="5" required></textarea>

                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}