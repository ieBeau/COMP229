import '../../styles/components/buttons/ButtonDelete.css';

import { useState } from 'react';
import { useData } from '../../context/DataContext';

import WarningDelete from '../warnings/WarningDelete';
import { fetchApi } from '../../utils/api';

export default function ButtonDelete({ id, type }) {

    const [showWarning, setShowWarning] = useState(false);

    const { setProjects, setEducation, setContacts } = useData();
    
    const handleButtonDelete = (e) => {
        e.stopPropagation();

        if (!id && !type) {
            console.error("ID or type not provided for deletion.");
            return;
        }

        fetchApi(`${type}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            
            if (type === 'projects') setProjects(prevProjects => prevProjects.filter(project => project._id !== id));
            else if (type === 'education') setEducation(prevEducation => prevEducation.filter(edu => edu._id !== id));
            else if (type === 'contacts') setContacts(prevContacts => prevContacts.filter(contact => contact._id !== id));
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
    }

    return (
        <>
            <button className="button-delete" onClick={(e) => { e.stopPropagation(); setShowWarning(true); }}>Delete</button>
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