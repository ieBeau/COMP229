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

// import logoCalculator from '../assets/images/projects/project-calculator-logo.png';
// import logoFitnessTrainer from '../assets/images/projects/project-fitness-logo.png';
// import logoStockTrading from '../assets/images/projects/project-trading-logo.png';
import { useUser } from '../context/UserContext.jsx';
import { useEffect, useState } from 'react';

import ProjectEdit from '../components/cards/ProjectEdit.jsx';
import ProjectCreate from '../components/cards/ProjectCreate.jsx';

export default function Projects () {

    const { isAdmin } = useUser();

    const [projects, setProjects] = useState([]);

    const getProjects = async () => {
        await fetch('http://localhost:3000/api/projects', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => setProjects(data))
        .catch(error => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        getProjects();
    }, []);

    const handleCreate = (newProject) => {
        setProjects([...projects, newProject]);
    }

    const handleEdit = (newProject) => {
        setProjects(projects.map(project => 
            project._id === newProject._id ? { ...project, ...newProject } : project
        ));
    }

    const handleDelete = (id) => {
        setProjects(projects.filter(project => project._id !== id));
    }

    const [currentProject, setCurrentProject] = useState(null);
    const [showEditProjectForm, setShowEditProjectForm] = useState(false);
    const toggleEditProjectForm = () => {
        setShowEditProjectForm(!showEditProjectForm);
    }

    const [showCreateProjectForm, setShowCreateProjectForm] = useState(false);
    const toggleCreateProjectForm = () => {
        setShowCreateProjectForm(!showCreateProjectForm);
    }

    return (
        <div className="projects">

            { showCreateProjectForm && <ProjectCreate handleAction={handleCreate} onClose={toggleCreateProjectForm} />}

            { showEditProjectForm && <ProjectEdit project={currentProject} handleAction={handleEdit} onClose={toggleEditProjectForm} /> }

            <div className="page-title">PERSONAL PROJECTS</div>
            
            { isAdmin && <button className="admin-banner" onClick={toggleCreateProjectForm}>Add Project</button> }

            <div className="list">
                {
                    projects.length > 0 ? (
                        projects.map((project) => (
                            project ?
                            <Project
                                key={project._id}
                                id={project._id}
                                title={project.title}
                                descriptions={project.descriptions}
                                image={project.image}
                                onClickEdit={() => { toggleEditProjectForm(), setCurrentProject(project) }}
                                onClickDelete={() => handleDelete(project._id)}
                            />
                            : <></>
                        ))
                    ) : (
                        <p>No projects found.</p>
                    )
                }

                {/* <Project
                    id={1}
                    title="Fitness Trainer"
                    descriptions={[
                        "Developed an AI-driven system to generate personalized workout plans for users",
                        "Designed and implemented features to track and analyze historical workout data",
                        "Leveraged Google Cloud Platform web services for automated scheduling of API calls"
                    ]}
                    image={logoFitnessTrainer}
                />
                <Project
                    id={2}
                    title="Calculator Hub"
                    descriptions={[
                        "Maintained a comprehensive database of international currency rates",
                        "Automated currency rate updates by scheduling API calls via Google Cloud Platform",
                        "Enabled offline functionality to allow users to access previous conversion rates"
                    ]}
                    image={logoCalculator}
                    size={100}
                />
                <Project
                    id={3}
                    title="Automated Stock Trading"
                    descriptions={[
                        "Designed trading algorithms incorporating risk and reward analysis to optimize performance",
                        "Automated execution of personalized trading strategies for consistent operation",
                        "Containerized the program using Docker to enable scheduled deployment and automation"
                    ]}
                    image={logoStockTrading}
                /> */}
            </div>
        </div>
    )
}