/**
 * PDF component renders a button to display a PDF resume in an iframe modal.
 * 
 * When the "Resume" button is clicked, a modal with the embedded PDF appears.
 * The modal can be closed by clicking outside the PDF or by clicking the "Close" button.
 * 
 * @component
 * @returns {JSX.Element} The rendered PDF modal with a toggle button.
 * 
 * @example
 * // Usage in a React application
 * <PDF />
 */

import '../styles/components/PDF.css';

import resume from '../assets/documents/resume.pdf';

import { useState } from 'react';

export default function PDF () {
    
    const [showPDF, setShowPDF] = useState(false);

    return (
        <>
            <button className='pdf-button' onClick={() => setShowPDF(!showPDF)}>Resume</button>
            {showPDF && (
                <div className='pdf-container' onClick={() => setShowPDF(false)}>
                    <iframe className='pdf' src={resume} width={'35%'} height={'90%'} />
                    
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