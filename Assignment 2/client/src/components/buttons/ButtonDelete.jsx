import '../../styles/components/buttons/ButtonDelete.css';

import { useState } from 'react';

import WarningDelete from '../warnings/WarningDelete';

export default function ButtonDelete({ id, type, onClick }) {

    const [showWarning, setShowWarning] = useState(false);
    
    const handleButtonDelete = (e) => {
        e.stopPropagation();

        if (!id && !type) {
            console.error("ID or type not provided for deletion.");
            return;
        }

        fetch(`http://localhost:3000/api/${type}/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            onClick();
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
    }

    return (
        <>
            <button className="button-delete" onClick={() => setShowWarning(true)}>Delete</button>
            {
                showWarning ? 
                    <WarningDelete 
                        onConfirm={handleButtonDelete} 
                        onCancel={() => setShowWarning(false)} 
                    />
                : null
            }
        </>
    );
}