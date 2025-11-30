/**
 * About component renders the "About Me" page with a personal summary, headshot, and a downloadable PDF.
 * 
 * The page displays a brief biography, technical skills, and career goals, along with a profile image.
 * It also includes a PDF component for downloading or viewing additional information (e.g., resume).
 * 
 * @component
 * @returns {JSX.Element} The rendered About Me page with summary, headshot, and PDF download.
 * 
 * @example
 * // Usage in a React Router setup
 * <Route path="/about" element={<About />} />
 */

import '../styles/scenes/About.css';

import PDF from '../components/misc/PDF.jsx';

const photo = '/images/headshot.png';

export default function About () {

    return (
        <div className='about-me'>
            <div className="page-title">BIOGRAPHY</div>

            <div className='summary-container'>

                <img className='photo' src={photo} alt="Pierre Moreau" /> 

                <div className='summary'>
                    <p>
                        Pierre Moreau is currently a software engineering student at Centennial College with over six years of programming experience.
                        Over the years, he has developed a variety of applications and programs, combining his technical expertise with a background in finance to bring unique problem-solving perspectives to his work.
                    </p>
                    <p>
                        He is proficient in languages like C#, Java, JavaScript, and Python, and has worked with frameworks and tools such as .NET, Node.js, React, Express, Docker, and cloud platforms like Google Cloud and Microsoft Azure. 
                        His projects span web, mobile, and backend systems, and he enjoys designing solutions that are both functional and scalable.
                    </p>
                    <p>
                        Pierre values respect, fairness, and collaboration, and approaches every project with perseverance and a strong work ethic. 
                        Looking ahead, his long-term goal is to become a Software Engineer at a company with a large infrastructure, where he hopes to contribute to large-scale, innovative technologies that make a big impact.
                    </p>
                </div>
            </div>

            <PDF />
        </div>
    )
}