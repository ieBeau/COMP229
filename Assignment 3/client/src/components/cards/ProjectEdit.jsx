import '../../styles/components/cards/ProjectEdit.css';

import { useEffect, useState } from "react";

export default function ProjectEdit ({ project, handleAction, onClose }) {

    const [form, setForm] = useState({
        firstname: project.firstname,
        lastname: project.lastname,
        email: project.email,
        title: project.title,
        descriptions: project.descriptions,
        image: project.image
    });

    useEffect(() => {
        try {
            const titleEl = document.querySelector('input[name="title"]');
            if (titleEl) titleEl.value = form.title ?? '';

            ['1','2','3'].forEach(i => {
                const descEl = document.querySelector(`textarea[name="description${i}"]`);
                if (descEl) descEl.value = (form.descriptions && form.descriptions[i-1]) ? form.descriptions[i-1] : '';
            });

            const img = document.getElementById('new-project-image-preview');
            const nameSpan = document.getElementById('new-project-image-name');

            if (form.image) img.src = form.image;
            if (form.image && typeof form.image === 'string') nameSpan.textContent = `${form.title.toLowerCase().replaceAll(' ','-')}.${form.image.split(';')[0].split('/').pop()}`;
          
        } catch (err) {
            // ignore DOM errors during initial mount
        }
    }, []);

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

        fetch(`http://localhost:3000/api/projects/${project._id}`, {
            method: 'PUT',
            credentials: 'include',
            body: formData
        })
        .then(response => response.json())
        .then(data => handleAction(data))
        .catch(error => {
            console.error('Error:', error);
        });
    
        onClose();
    };

    return (
        <div className="edit-project-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="edit-project-container">
                <button className="close-button" onClick={onClose}>✖</button>
                
                <div className="form-container" onClick={(e) => e.stopPropagation()}>
                    
                    <h2>Edit Project</h2>

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

                        <button type="submit">Accept</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
