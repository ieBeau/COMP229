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

import '../../styles/components/misc/MainLogo.css'

import logo from '/logos/PM_Portfolio_Logo_SerifWhite.png';

import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext';

export default function MainLogo() {
    
    const navigate = useNavigate();

    const { user } = useUser();

    return (
        <div className='main-logo'>
            <img className="logo" src={logo} alt="Logo" onClick={() => user ? navigate('/') : navigate('/login')} />
            <div className='background' />
        </div>
    );
}
