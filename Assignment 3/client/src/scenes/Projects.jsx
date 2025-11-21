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

import { useUser } from '../context/UserContext.jsx';
import { useState } from 'react';
import { useData } from '../context/DataContext.jsx';

import Project from "../components/cards/Project.jsx";
import ProjectEdit from '../components/cards/ProjectEdit.jsx';
import ProjectCreate from '../components/cards/ProjectCreate.jsx';

export default function Projects () {

    const { isAdmin } = useUser();
    const { isLoading, projects } = useData();

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

            { showCreateProjectForm && <ProjectCreate onClose={toggleCreateProjectForm} />}
            { showEditProjectForm && <ProjectEdit project={currentProject} onClose={toggleEditProjectForm} /> }

            <div className="page-title">PERSONAL PROJECTS</div>
            
            { isAdmin && <button className="admin-banner" onClick={toggleCreateProjectForm}>Add Project</button> }

            <div className="list">
                {
                    isLoading ? (
                        <p className='placeholder'>Loading projects...</p>
                    ) : (
                        projects.length > 0 ? (
                            projects.map(project => (
                                project ?
                                <Project
                                    key={project._id}
                                    id={project._id}
                                    title={project.title}
                                    descriptions={project.descriptions}
                                    image={project.image}
                                    onClickEdit={() => { toggleEditProjectForm(); setCurrentProject(project); }}
                                />
                                : <></>
                            ))
                        ) : (
                            <p className='placeholder'>No projects found.</p>
                        )
                    )
                }
            </div>
        </div>
    )
}