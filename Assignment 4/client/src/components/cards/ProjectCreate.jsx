import '../../styles/components/cards/ProjectCreate.css';

import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useData } from '../../context/DataContext';
import { fetchApi } from '../../utils/api';

export default function ProjectCreate ({ onClose }) {

    const { user } = useUser();
    const { projects, setProjects } = useData();

    const [form, setForm] = useState({
        firstname: user.username.split(' ')[0] || "",
        lastname: user.username.split(' ')[1] || "",
        email: user.email || "",
        title: "",
        descriptions: ["", "", ""],
        image: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        
        if (name === "title") setForm({ ...form, [name]: value });
        else if (files) setForm({ ...form, image: files[0] });
        else if (name.startsWith("description")) {
            const index = parseInt(name.replace("description", "")) - 1;
            const newDescriptions = [...form.descriptions];
            newDescriptions[index] = value;
            setForm({ ...form, descriptions: newDescriptions });
        }
    };

    const handleImageSearch = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        const img = document.getElementById('new-project-image-preview');
        if (img) img.src = url;

        const nameSpan = document.getElementById('new-project-image-name');
        if (nameSpan) nameSpan.textContent = file.name;

        handleChange(e);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.descriptions.every(desc => desc.trim() === "")) {
            const descEl = document.querySelector('textarea[name="description1"]');
            if (descEl) {
                descEl.setCustomValidity("Please provide at least one description");
                descEl.reportValidity();
                descEl.focus();
                // Clear validity message on next input
                const clearValidity = () => {
                    descEl.setCustomValidity("");
                    descEl.removeEventListener("input", clearValidity);
                };
                // Remove validity message on next input
                const globalClear = () => {
                    clearValidity();
                    document.removeEventListener("input", globalClear);
                };
                descEl.addEventListener("input", clearValidity);
                document.addEventListener("input", globalClear);
            }
            return;
        }

        const formData = new FormData();
        formData.append("firstname", form.firstname);
        formData.append("lastname", form.lastname);
        formData.append("email", form.email);
        formData.append("title", form.title);
        formData.append("image", form.image);
        
        const descriptions = form.descriptions.map(desc => desc.trim() + "\n");
        formData.append("descriptions", descriptions.filter(desc => desc.trim() !== ""));

        fetchApi('/projects', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            setProjects([...projects, data]);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    
        onClose();
    };

    return (
        <div className="create-project-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="create-project-container">
                <button className="close-button" onClick={onClose}>✖</button>

                <div className="form-container" onClick={(e) => e.stopPropagation()}>

                    <h2>Add New Project</h2>

                    <form className='project-form' onSubmit={handleSubmit}>
                        <label className='project-title'>Project Title *</label>
                        <input type="text" name="title" placeholder="Project Title" onChange={handleChange} required />

                        <label className='project-descriptions'>Project Descriptions *</label>
                        <textarea name="description1" placeholder="Project Description 1" onChange={handleChange}></textarea>
                        <textarea name="description2" placeholder="Project Description 2" onChange={handleChange}></textarea>
                        <textarea name="description3" placeholder="Project Description 3" onChange={handleChange}></textarea>
                        
                        <div className='project-image-container'>
                            <input
                                type="file"
                                id="project-image-input"
                                name="image"
                                accept="image/*"
                                onChange={handleImageSearch}
                            />

                            <label className='project-image-button' htmlFor="project-image-input">
                                Choose Image
                            </label>

                            <span id="new-project-image-name"></span>

                            <img
                                id="new-project-image-preview"
                                alt="Preview"
                                style={{ display: form.image ? 'block' : 'none' }}
                            />
                        </div>

                        <button type="submit">Add Project</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
