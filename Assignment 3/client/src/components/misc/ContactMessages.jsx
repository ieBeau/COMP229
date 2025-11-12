import '../../styles/components/misc/ContactMessages.css';

import { useData } from '../../context/DataContext';

import Message from '../cards/Message';

export default function ContactMessages ({ onClose }) {
    
    const { contacts } = useData();

    return (
        <div className='contact-message-backdrop' onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>

            <div className='contact-message-container'>
                <button className="close-button" onClick={onClose}>✖</button>
                
                <div className='container'>
                    
                    <h2>Messages</h2>

                    <div className='messages-list'>
                        { 
                            contacts.length > 0 ? (
                                contacts.map(message => (
                                    message ? (
                                    <Message
                                        key={message._id}
                                        id={message._id}
                                        firstname={message.firstname}
                                        lastname={message.lastname}
                                        phone={message.phone}
                                        email={message.email}
                                        message={message.message}
                                    />
                                    ) : null
                                ))
                            ) : (
                                <p>No messages found.</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}