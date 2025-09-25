import '../styles/components/Header.css'

import { Link } from 'react-router-dom'
import BackgroundHeader from './backgrounds/BackgroundHeader';
import MainLogo from './MainLogo';

export default function Layout() {

    return (
        <div className='layout'>
            
            <div className="header-lines">

                <BackgroundHeader />
                
                <div className="line" />

                <MainLogo />

                <div className='navigation'>
                    <nav>
                        <Link to="/">HOME</Link>
                        <Link to="/about">ABOUT</Link>
                        <Link to="/projects">PROJECTS</Link>
                        <Link to="/education">EDUCATION</Link>
                        <Link to="/services">SERVICES</Link>
                        <Link to="/contact">CONTACT</Link>
                    </nav>

                    <div className="line" />
                </div>
            </div>
        </div>
    );
}
