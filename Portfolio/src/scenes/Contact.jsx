import '../styles/Contact.css';

export default function Contact () {
    return (
        <div className="contact">
            <h2>Contact Me</h2>

            <div className="contact-info">
                <p><b>Email:</b> contact.pmoreau@gmail.com</p>
                <p><b>Phone:</b> 647-309-3474</p>
                <p><b>Address:</b> 82 Elvira Crescent, L3S 3S6, Markham, ON, Canada</p>
                <p><b>LinkedIn:</b> <a href="https://www.linkedin.com/in/pierre-moreau/" target="_blank">linkedin.com/in/pierre-moreau</a></p>
                <p><b>GitHub:</b> <a href="https://github.com/ieBeau" target="_blank">github.com/ieBeau</a></p>
            </div>

            {/* First the user to the home page */}
            <form action="" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', textAlign: 'left' }}>
                <label><b>First Name:</b> <input type="text" name="firstName" required /></label>
                <label><b>Last Name:</b> <input type="text" name="lastName" required /></label>
                <label><b>Phone Number:</b> <input type="tel" name="phone" required /></label>
                <label><b>Your Email:</b> <input type="email" name="email" required /></label>
                <label><b>Message:</b> <textarea name="message" rows="5" required></textarea></label>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}