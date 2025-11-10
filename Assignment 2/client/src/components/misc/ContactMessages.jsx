

import '../../styles/components/misc/ContactMessages.css';

import { useEffect, useState } from 'react';
import Message from '../cards/Message';

export default function ContactMessages ({ onClose }) {
    
    const [messages, setMessages] = useState([]);

    const getMessages = async () => {
        await fetch('http://localhost:3000/api/contacts', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => setMessages(data))
        .catch(error => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        getMessages();
    }, []);
    
    const handleDelete = (id) => {
        setMessages(messages.filter(message => message._id !== id));
    }

    return (
        <div className='contact-message-backdrop' onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>

            <div className='contact-message-container'>
                <button className="close-button" onClick={onClose}>✖</button>
                
                <div className='container'>
                    
                    <h2>Messages</h2>

                    <div className='messages-list' style={{ maxHeight: '73vh', overflowY: 'auto', paddingRight: '8px', borderRadius: '15px' }}>
                        { 
                            messages.length > 0 ? (
                                messages.map((message) => (
                                    message ? (
                                    <Message
                                        key={message._id}
                                        id={message._id}
                                        firstname={message.firstname}
                                        lastname={message.lastname}
                                        phone={message.phone}
                                        email={message.email}
                                        message={message.message}
                                        onClickDelete={() => handleDelete(message._id)}
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