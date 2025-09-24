import '../styles/components/Header.css'

import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
// import logo from '/logo.svg'
import logo from '../assets/images/PM_Portfolio_Logo_SerifWhite.png';

export default function Layout() {

    const navigate = useNavigate();

    return (
        <div className='layout'>
            {/* <img className='logo' src={logo} alt="Logo" onClick={() => navigate('/')} /> */}
            <div className="header-lines">
                <div className="line" />
                <img className='logo' src={logo} alt="Logo" onClick={() => navigate('/')} />
                <div className='navigation'>
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/projects">Projects</Link>
                        <Link to="/education">Education</Link>
                        <Link to="/services">Services</Link>
                        <Link to="/contact">Contact</Link>
                    </nav>
                    <div className="line" />
                </div>
            </div>
            {/* <h1 className='title'>Pierre Moreau</h1> */}
        </div>
    );
}
