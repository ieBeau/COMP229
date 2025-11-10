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

import { useUser } from '../context/UserContext.jsx';
import { useState } from 'react';
import { useData } from '../context/DataContext.jsx';

import School from '../components/cards/School.jsx';
import SchoolCreate from '../components/cards/SchoolCreate.jsx';
import SchoolEdit from '../components/cards/SchoolEdit.jsx';

export default function Education () {

    const { isAdmin } = useUser();

    const { education, setEducation } = useData();
    
    const handleCreate = (newEducation) => {
        setEducation([...education, newEducation]);
    }

    const handleEdit = (newEducation) => {
        setEducation(education.map(edu => 
            edu._id === newEducation._id ? { ...edu, ...newEducation } : edu
        ));
    }

    const handleDelete = (id) => {
        setEducation(education.filter(edu => edu._id !== id));
    }
    
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

            { showCreateEducationForm && <SchoolCreate handleAction={handleCreate} onClose={toggleCreateEducationForm} /> }

            { showEditEducationForm && <SchoolEdit school={currentEducation} handleAction={handleEdit} onClose={toggleEditEducationForm} /> }

            <div className="page-title">EDUCATION</div>

            { isAdmin && <button className="admin-banner" onClick={toggleCreateEducationForm}>Add Education</button> }

            <div className="list">
                {
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
                                onClickEdit={() => { toggleEditEducationForm(), setCurrentEducation(edu) }}
                                onClickDelete={() => handleDelete(edu._id)}
                            />
                            : <></>
                        ))
                    ) : (
                        <p>No education records found.</p>
                    )
                }

                {/* <School 
                    name="Centennial College"
                    degree="Advanced Diploma"
                    program="Software Engineering Technology (Co-op)"
                    studentGPA="4.5 (98%)"
                    schoolGPA="4.5"
                    started="September 2024"
                    graduation="December 2027"
                    graduated={0}
                    location="Toronto, ON"
                    image={logoCentennialCollege}
                    url="https://www.centennialcollege.ca/programs-courses/full-time/software-engineering-technology-online"
                />
                <School 
                    name="Seneca Polytechnic"
                    degree="Diploma"
                    program="Acting for Camera and Voice"
                    started="September 2013"
                    graduation="April 2015"
                    graduated={1}
                    location="Toronto, ON"
                    image={logoSenecaCollege}
                    url="https://www.senecapolytechnic.ca/programs/fulltime/ACV.html"
                /> */}
            </div>
        </div>
    )
}