/**
 * MainLogo component renders the main logo of the portfolio site.
 * 
 * The logo is displayed as an image and acts as a clickable element.
 * When clicked, it navigates the user to the home page using React Router's navigation.
 * A background div is also rendered for styling purposes.
 * 
 * @component
 * @returns {JSX.Element} The rendered main logo with navigation functionality.
 * 
 * @example
 * // Usage in a header component
 * <MainLogo />
 */

import '../styles/components/MainLogo.css'

import logo from '../assets/images/logos/PM_Portfolio_Logo_SerifWhite.png';

import { useNavigate } from 'react-router-dom'

export default function MainLogo() {
    
    const navigate = useNavigate();

    return (
        <div className='main-logo'>
            <img className="logo" src={logo} alt="Logo" onClick={() => navigate('/')} />
            <div className='background' />
        </div>
    );
}
