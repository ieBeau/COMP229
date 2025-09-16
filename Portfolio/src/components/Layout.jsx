import '../styles/Layout.css'

import React from 'react';
import { Link } from 'react-router-dom'
import logo from '/logo.svg'

export default function Layout() {

    const [currentPath, setCurrentPath] = React.useState(window.location.pathname);

    return (
        <div className='layout'>
            <img src={logo} alt="Logo" height={100} width={100} />
            <h1 className='title'>My Portfolio</h1>
            <nav>
                <Link to="/" onClick={() => setCurrentPath("/")} className={currentPath === "/" ? "active" : ""}>Home</Link>
                <Link to="/about" onClick={() => setCurrentPath("/about")} className={currentPath === "/about" ? "active" : ""}>About</Link>
                <Link to="/projects" onClick={() => setCurrentPath("/projects")} className={currentPath === "/projects" ? "active" : ""}>Projects</Link>
                <Link to="/education" onClick={() => setCurrentPath("/education")} className={currentPath === "/education" ? "active" : ""}>Education</Link>
                <Link to="/services" onClick={() => setCurrentPath("/services")} className={currentPath === "/services" ? "active" : ""}>Services</Link>
                <Link to="/contact" onClick={() => setCurrentPath("/contact")} className={currentPath === "/contact" ? "active" : ""}>Contact</Link>
            </nav>
        </div>
    );
}
