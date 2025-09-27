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

import School from '../components/cards/School.jsx';

import logoCentennialCollege from '../assets/images/school/school-centennial-logo.png'
import logoSenecaCollege from '../assets/images/school/school-seneca-logo.png'

export default function Education () {
    return (
        <div className="education">
            <div className="page-title">EDUCATION</div>

            <div className="list">
                <School 
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
                />
            </div>

            
        </div>
    )
}