import '../styles/components/School.css';

export default function School({ name, degree, program, gpa = "", graduation, location, image = "/logo.svg", url = "" }) {

    return (
        <div className="school" onClick={() => window.open(url, "_blank")}>
            <img src={image} alt={name} width={100} height={100} />

            <div className='details'>
                <h2>{name}</h2>

                <div className='info'>
                    <p>{degree} in {program}</p>

                    <div className='additional-info'>
                        <p>{location}{gpa ? ` | GPA: ${gpa}` : ""}</p>
                        <p>Expected: {graduation}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}