import headshot from '../assets/images/headshot.png'
import PDF from '../components/PDF'

export default function About () {
    return (
        <>
            <h1>About Me</h1>

            <h2>Pierre Moreau</h2>
            <img src={headshot} alt="Pierre Moreau" height={150} width={150} />
            <p>I'm a passionate web developer with a focus on creating dynamic and responsive web applications.</p>

            <PDF />
        </>
    )
}