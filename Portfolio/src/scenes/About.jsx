import '../styles/scenes/About.css';

import headshot from '../assets/images/headshot.png'
import PDF from '../components/PDF'

export default function About () {
    return (
        <div className='about-me'>

            <div className="page-title">ABOUT ME</div>

            <div className='summary'>
                <p>
                    <img className='photo' src={headshot} alt="Pierre Moreau" /> 
                    I'm Pierre Moreau, a software engineering student at Centennial College with over six years of programming experience.
                    Over the years, I've developed a variety of applications and programs, combining my technical expertise with a background in finance to bring unique problem-solving perspectives to my work.
                </p>
                <p>
                    I'm proficient in languages like C#, Java, JavaScript, and Python, and I've worked with frameworks and tools such as .NET, Node.js, React, Express, Docker, and cloud platforms like Google Cloud and Microsoft Azure. 
                    My projects span web, mobile, and backend systems, and I enjoy designing solutions that are both functional and scalable.
                </p>
                <p>
                    I value respect, fairness, and collaboration, and I approach every project with perseverance and a strong work ethic. 
                    Looking ahead, my long-term goal is to become a Software Engineer at a company with a large infrastructure, where I hope to contribute to large-scale, innovative technologies that make a real impact.
                </p>
            </div>

            <PDF />

        </div>
    )
}