import '../styles/components/MainLogo.css'

import logo from '../assets/images/PM_Portfolio_Logo_SerifWhite.png';

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
