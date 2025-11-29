/**
 * Education component renders the education page with a list of educational institutions attended.
 * 
 * Displays each school as a card with details such as name, degree, program, GPA, attendance dates, graduation status, location, logo, and a link to the program.
 * 
 * @component
 * @returns {JSX.Element} The rendered education page with a list of School cards.
 * 
 * @example
 * // Usage in a React Router setup
 * <Route path="/education" element={<Education />} />
 */

import '../styles/scenes/Education.css';

import { useState } from 'react';

import { useUser } from '../context/UserContext.jsx';
import { useData } from '../context/DataContext.jsx';

import School from '../components/cards/School.jsx';
import SchoolCreate from '../components/cards/SchoolCreate.jsx';
import SchoolEdit from '../components/cards/SchoolEdit.jsx';

export default function Education () {

    const { isAdmin } = useUser();

    const { isLoading, education } = useData();
    
    const [currentEducation, setCurrentEducation] = useState(null);
    const [showEditEducationForm, setShowEditEducationForm] = useState(false);
    const toggleEditEducationForm = () => {
        setShowEditEducationForm(!showEditEducationForm);
    }
    
    const [showCreateEducationForm, setShowCreateEducationForm] = useState(false);
    const toggleCreateEducationForm = () => {
        setShowCreateEducationForm(!showCreateEducationForm);
    }

    return (
        <div className="education">

            { showCreateEducationForm && <SchoolCreate onClose={toggleCreateEducationForm} /> }
            { showEditEducationForm && <SchoolEdit school={currentEducation} onClose={toggleEditEducationForm} /> }

            <div className="page-title">EDUCATION</div>

            { isAdmin && <button className="admin-banner" onClick={toggleCreateEducationForm}>Add Education</button> }

            <div className="list">
                {
                    isLoading ? (
                        <p className='placeholder'>Loading education records...</p>
                    ) : (
                        education.length > 0 ? (
                            education.map((edu) => (
                                edu ?
                                <School
                                    key={edu._id}
                                    id={edu._id}
                                    school={edu.school}
                                    program={edu.program}
                                    degree={edu.degree}
                                    studentGPA={edu.studentGPA}
                                    schoolGPA={edu.schoolGPA}
                                    start={edu.start}
                                    end={edu.end}
                                    location={edu.location}
                                    url={edu.url}
                                    image={edu.image}
                                    onClickEdit={() => { toggleEditEducationForm(); setCurrentEducation(edu); }}
                                />
                                : <></>
                            ))
                        ) : (
                            <p className='placeholder'>No education records found.</p>
                        )
                    )
                }
            </div>
        </div>
    )
}