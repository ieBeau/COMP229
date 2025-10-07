/**
 * Home component renders the homepage with a slogan, mission statement, and a "Learn More" button.
 * 
 * The slogan highlights the transformation of ideas into innovation. The mission statement outlines the developer's goals and values.
 * The "Learn More" button navigates the user to the About page.
 * 
 * @component
 * @returns {JSX.Element} The rendered homepage with slogan, mission statement, and navigation button.
 * 
 * @example
 * // Usage in a React Router setup
 * <Route path="/" element={<Home />} />
 */

import '../styles/scenes/Home.css';

export default function Home () {
    return (
        <div className="home">

            <div className='slogan'>
                WHERE IDEAS<br/>
                BECOME<br/>
                <span className='highlight'>INNOVATION</span>
            </div>

            <div className="mission-statement">
                <div className='mission-title'>Mission Statement</div>
                
                My mission is to design and develop innovative, reliable, and scalable software solutions that solve real-world problems. 
                I strive to combine technical expertise with creativity and collaboration, building systems that not only perform but also create meaningful impact. 
                Guided by values of respect, fairness, and continuous learning, I aim to grow as a professional and ultimately contribute to groundbreaking technologies that shape the future of how people connect and innovate.
            </div>

            <button className='learn-more' onClick={() => window.location.href = '/about'}>Learn More</button>

        </div>
    )
}