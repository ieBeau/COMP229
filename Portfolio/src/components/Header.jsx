import '../styles/components/Header.css'

import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import logo from '/logo.svg'

export default function Layout() {

    const [currentPath, setCurrentPath] = React.useState(window.location.pathname);
    const navigate = useNavigate();

    return (
        <div className='layout'>
            <img className='logo' src={logo} alt="Logo" onClick={() => navigate('/')} />
            <h1 className='title'>Pierre Moreau</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/education">Education</Link>
                <Link to="/services">Services</Link>
                <Link to="/contact">Contact</Link>
            </nav>
        </div>
    );
}
