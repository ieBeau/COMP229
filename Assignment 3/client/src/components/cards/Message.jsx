
import { useUser } from '../../context/UserContext';
import '../../styles/components/cards/Message.css';

import ButtonDelete from '../buttons/ButtonDelete';

export default function Message({ id, firstname, lastname, email, phone, message, onClickDelete }) {

    const { isAdmin } = useUser();

    const formatPhone = (phone) => {
        // Format phone number as (123) 456-7890
        const cleaned = ('' + phone).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phone;
    };

    return (
        <div className="message">

            <div className='banner'>
                <div className='id'>ID:{id}</div>

                { isAdmin ? 
                    <div className='message-admin-buttons'>
                        <ButtonDelete id={id} type="contacts" onClick={() => onClickDelete()} />
                    </div>
                : null }
            </div>
                
            <div className='info'>
                <p>From:{'  '}<span>{firstname} {lastname}</span></p>
                <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
                <p>{phone ? <>Phone: <span>{formatPhone(phone)}</span></> : ''}</p>
            </div>

            <fieldset className='message-content'>
                <legend>Message</legend>
                <p className='content'>{message}</p>
            </fieldset>

        </div>
    );
}