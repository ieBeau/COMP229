import Project from "../components/Project"

export default function Projects () {
    return (
        <>
            <h1>Projects</h1>

            <Project
                name="Fitness Trainer"
                description={
                    <ul>
                        <li>Developed an AI-driven system to generate personalized workout plans based on user profiles</li>
                        <li>Designed and implemented features to track and analyze historical workout data</li>
                        <li>Leveraged Google Cloud Platform web services for automated scheduling of daily API calls</li>
                    </ul>
                }
                image="https://via.placeholder.com/150"
            />
            <Project
                name="Calculator Hub"
                description={
                    <ul>
                        <li>Maintained a comprehensive database of international currency rates using Firebase for distributed storage</li>
                        <li>Automated currency rate updates by scheduling API calls via Google Cloud Platform</li>
                        <li>Enabled offline functionality to allow users to access previous conversion rates without an internet connection</li>
                    </ul>
                }
                image="https://via.placeholder.com/150"
            />
            <Project
                name="Automated Stock Trading"
                description={
                    <ul>
                        <li>Designed trading algorithms incorporating risk and reward analysis to optimize performance</li>
                        <li>Automated execution of personalized trading strategies for consistent operation</li>
                        <li>Containerized the program using Docker to enable scheduled deployment and automation</li>
                    </ul>
                }
                image="https://via.placeholder.com/150"
            />
        </>
    )
}