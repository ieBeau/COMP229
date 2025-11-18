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

import { useUser } from '../../context/UserContext';

import ButtonDelete from '../buttons/ButtonDelete';
import ButtonEdit from '../buttons/ButtonEdit';

export default function School({ id, school, degree, program, studentGPA, schoolGPA, start, end, location, image, url = "", onClickEdit, size = 125 }) {

    const { isAdmin } = useUser();
    
    // Clamp size between 50 and 125 to center images
    if (size > 125) size = 125;
    else if (size < 50) size = 50;

    const graduated = new Date() >= new Date(end);
    
    // Default image if none provided
    if (!image) image = "/logo.svg";
    
    const formatMonthYear = (dateStr) => {
        if (!dateStr) return "";

        const date = new Date(dateStr);

        if (isNaN(date)) return dateStr;

        return date.toLocaleString(undefined, { month: "long", year: "numeric" });
    };

    const formattedStart = formatMonthYear(start);
    const formattedEnd = formatMonthYear(end);

    let studentGPAValue
    let studentGPAAvg; 

    if (studentGPA) {
        studentGPAValue = studentGPA.split(' ')[0];
        studentGPAAvg = studentGPA.split(' ').filter(val => val.includes('%'))[0]; 
        studentGPAAvg = studentGPAAvg ? studentGPAAvg.replace(/[^0-9.%]+/g, "") : "";
    }

    return (
        <div className="school" onClick={() => url && window.open(url, "_blank")}>
            <img src={image} alt={school} width={100} height={100} />
            <div className='details'>
                <div className='school-header'>
                    <div className='school-name'>{school}</div>

                    { isAdmin ? 
                        <div className='school-admin-buttons'>
                            <ButtonEdit onClick={onClickEdit} />
                            <ButtonDelete id={id} type="education" />
                        </div>
                    : null }
                </div>

                <div className='info'>
                    <p className='degree'>{degree} in {program}</p>

                    <div className='additional-info'>
                        <p className='location'>{location}{studentGPA ? ` | GPA: ${studentGPAValue} / ${schoolGPA} ${studentGPAAvg ? `(${studentGPAAvg})` : ""}` : ""}</p>
                        <p className='graduation'>{graduated ? `${formattedStart} - ${formattedEnd}` : `Expected: ${formattedEnd}`}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}