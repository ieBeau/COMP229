/**
 * Header component renders the main header section of the application, including navigation links and branding.
 * 
 * The header includes a background, a main logo, and navigation links to different pages such as Home, About, Projects, Education, Services, and Contact.
 * 
 * @component
 * @returns {JSX.Element} The rendered header layout with navigation and branding.
 * 
 * @example
 * // Usage in a React Router setup
 * <Route path="/" element={<Layout />} />
 */

import '../styles/components/Header.css'

import { Link } from 'react-router-dom'
import HeaderBackground from './backgrounds/HeaderBackground';
import MainLogo from './MainLogo';

export default function Header() {

    return (
        <div className='header'>
            
            <div className="header-lines">

                <HeaderBackground />
                
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
