import '../../styles/components/cards/School.css';

export default function School({ name, degree, program, studentGPA = "", schoolGPA = "", started, graduation, graduated, location, image = "/logo.svg", url = "" }) {

    return (
        <div className="school" onClick={() => window.open(url, "_blank")}>
            <img src={image} alt={name} width={100} height={100} />

            <div className='details'>
                <h2 className='school-name'>{name}</h2>

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