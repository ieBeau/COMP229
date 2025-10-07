/**
 * School component displays information about an educational institution, including its name, degree, program, GPA, dates, location, and logo.
 * 
 * The component renders a card with the school's logo, name, degree/program, GPA, location, and graduation information.
 * Clicking the card opens the school's website in a new browser tab if a URL is provided.
 * 
 * @component
 * @param {Object} props - The props for the School component.
 * @param {string} props.name - The name of the school.
 * @param {string} props.degree - The degree earned or pursued.
 * @param {string} props.program - The program or major.
 * @param {string} [props.studentGPA=""] - The student's GPA (optional).
 * @param {string} [props.schoolGPA=""] - The maximum possible GPA at the school (optional).
 * @param {string} props.started - The start date or year of attendance.
 * @param {string} props.graduation - The graduation date or expected graduation.
 * @param {boolean} props.graduated - Whether the student has graduated.
 * @param {string} props.location - The location of the school.
 * @param {string} [props.image="/logo.svg"] - The URL of the school's logo image (optional).
 * @param {string} [props.url=""] - The URL to the school's website (optional).
 * @returns {JSX.Element} The rendered school card with details and clickable link.
 * 
 */

import '../../styles/components/cards/School.css';

export default function School({ name, degree, program, studentGPA = "", schoolGPA = "", started, graduation, graduated, location, image = "/logo.svg", url = "" }) {

    return (
        <div className="school" onClick={() => window.open(url, "_blank")}>
            <img src={image} alt={name} width={100} height={100} />

            <div className='details'>
                <div className='school-name'>{name}</div>

                <div className='info'>
                    <p className='degree'>{degree} in {program}</p>

                    <div className='additional-info'>
                        <p className='location'>{location}{studentGPA ? ` | GPA: ${schoolGPA} / ${studentGPA}` : ""}</p>
                        <p className='graduation'>{graduated ? `${started} - ` : "Expected:"} {graduation}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}