import '../styles/components/PDF.css';

import resume from '../assets/documents/resume.pdf';

import { useState } from 'react';

export default function PDF () {
    
    const [showPDF, setShowPDF] = useState(false);

    return (
        <>
            <button onClick={() => setShowPDF(!showPDF)}>Resume</button>
            {showPDF && (
                <div className='pdf-container' onClick={() => setShowPDF(false)}>
                    <iframe className='pdf' src={resume} width={500} height={690} />
                    
                    <button onClick={e => {
                            e.stopPropagation();
                            setShowPDF(false);
                        }}
                    >
                        Close
                    </button>
                </div>
            )}
        </>
    );
}