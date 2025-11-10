/**
 * Projects component renders a list of personal projects with their details.
 *
 * Each project displays its name, a list of descriptions, and an associated image.
 * The component is intended to showcase personal or portfolio projects, highlighting
 * key features and technologies used in each.
 *
 * @component
 * @returns {JSX.Element} The rendered projects page with a title and a list of Project components.
 *
 * @example
 * // Usage in a React Router setup
 * <Route path="/projects" element={<Projects />} />
 */

import '../styles/scenes/Projects.css';

import Project from "../components/cards/Project.jsx";

import logoCalculator from '../assets/images/projects/project-calculator-logo.png';
import logoFitnessTrainer from '../assets/images/projects/project-fitness-logo.png';
import logoStockTrading from '../assets/images/projects/project-trading-logo.png';

export default function Projects () {
    return (
        <div className="projects">
            <div className="page-title">PERSONAL PROJECTS</div>

            <div className="list">
                <Project
                    name="Fitness Trainer"
                    descriptions={[
                        "Developed an AI-driven system to generate personalized workout plans for users",
                        "Designed and implemented features to track and analyze historical workout data",
                        "Leveraged Google Cloud Platform web services for automated scheduling of API calls"
                    ]}
                    image={logoFitnessTrainer}
                />
                <Project
                    name="Calculator Hub"
                    descriptions={[
                        "Maintained a comprehensive database of international currency rates",
                        "Automated currency rate updates by scheduling API calls via Google Cloud Platform",
                        "Enabled offline functionality to allow users to access previous conversion rates"
                    ]}
                    image={logoCalculator}
                    size={100}
                />
                <Project
                    name="Automated Stock Trading"
                    descriptions={[
                        "Designed trading algorithms incorporating risk and reward analysis to optimize performance",
                        "Automated execution of personalized trading strategies for consistent operation",
                        "Containerized the program using Docker to enable scheduled deployment and automation"
                    ]}
                    image={logoStockTrading}
                />
            </div>
        </div>
    )
}