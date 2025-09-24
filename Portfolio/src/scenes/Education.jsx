import '../styles/scenes/Education.css';

import School from '../components/School';

import logoCentennialCollege from '../assets/images/centennial-college-logo.png'

export default function Education () {
    return (
        <div className="education">
            <h1>Education</h1>

            <div className="list">
                <School 
                    name="Centennial College"
                    degree="Advanced Diploma"
                    program="Software Engineering Technology (Co-op)"
                    gpa="4.5 (98%)"
                    graduation="December 2027"
                    location="Toronto, ON"
                    image={logoCentennialCollege}
                />
            </div>

            
        </div>
    )
}