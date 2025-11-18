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

import '../../styles/components/layouts/Header.css'

import { Link } from 'react-router-dom'

import { useUser } from '../../context/UserContext';

import HeaderBackground from '../backgrounds/HeaderBackground';
import MainLogo from '../misc/MainLogo';

export default function Header() {

    const { user, isAdmin, logout } = useUser();

    return (
        <div className='header'>
            
            <div className="header-lines">

                <HeaderBackground />

                
                <div className='login'>

                    {
                        user ? (
                            <nav>
                                <Link to="/" onClick={() => logout()}>LOGOUT</Link>
                                <div style={{ color: "rgba(255, 220, 144, 1)" }}>{user.username} {isAdmin ? "[Admin]" : ""}</div>
                            </nav>
                        ) : (
                            <nav>
                                <Link to="/login">LOGIN</Link>
                                <Link to="/register">REGISTER</Link>
                            </nav>
                        )
                    }

                    <div className="line" />
                </div>

                <MainLogo />

                <div className='navigation'>
                    {
                        user ? (
                            <nav>
                                <Link to="/">HOME</Link>
                                <Link to="/about">ABOUT</Link>
                                <Link to="/projects">PROJECTS</Link>
                                <Link to="/education">EDUCATION</Link>
                                <Link to="/services">SERVICES</Link>
                                <Link to="/contact">CONTACT</Link>
                            </nav>
                        ) : (
                            <nav>
                                <Link to="/contact">CONTACT</Link>
                            </nav>
                        )
                    }
                    <div className="line" />
                </div>
            </div>
        </div>
    );
}
