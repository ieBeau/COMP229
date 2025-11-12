import '../../styles/components/cards/SchoolCreate.css';

import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useData } from '../../context/DataContext';

export default function SchoolCreate ({ onClose }) {

    const { user } = useUser();
    const { education, setEducation } = useData();

    const [form, setForm] = useState({
        firstname: user.username.split(' ')[0] || "",
        lastname: user.username.split(' ')[1] || "",
        email: user.email || "",
        school: "",
        program: "",
        degree: "",
        studentGPA: null,
        schoolGPA: null,
        start: "",
        end: "",
        location: "",
        url: null,
        image: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        
        if (files) setForm({ ...form, image: files[0] });
        else setForm({ ...form, [name]: value });
    };

    const handleImageSearch = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        const img = document.getElementById('new-school-image-preview');
        if (img) img.src = url;

        const nameSpan = document.getElementById('new-school-image-name');
        if (nameSpan) nameSpan.textContent = file.name;

        handleChange(e);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("firstname", form.firstname);
        formData.append("lastname", form.lastname);
        formData.append("email", form.email);
        formData.append("school", form.school);
        formData.append("program", form.program);
        formData.append("degree", form.degree);
        formData.append("studentGPA", form.studentGPA);
        formData.append("schoolGPA", form.schoolGPA);
        formData.append("start", form.start);
        formData.append("end", form.end);
        formData.append("location", form.location);
        formData.append("url", form.url);
        formData.append("image", form.image);

        fetch('/api/education', {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            setEducation([...education, data]);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    
        onClose();
    };

    return (
        <div className="create-school-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="create-school-container">
                <button className="close-button" onClick={onClose}>✖</button>

                <div className="form-container" onClick={(e) => e.stopPropagation()}>

                    <h2>Add New School</h2>

                    <form className='school-form' onSubmit={handleSubmit}>
                        
                        <label className='school-name'>School Name *</label>
                        <input type="text" name="school" placeholder="School Name" onChange={handleChange} required />

                        <label className='program-name'>Program Name *</label>
                        <input type="text" name="program" placeholder="Program Name" onChange={handleChange} required />

                        <label className='degree-name'>Degree Name *</label>
                        <input type="text" name="degree" placeholder="Degree Name" onChange={handleChange} required />

                        <div className='two-col-container'>
                            <div className='col-input'>
                                <label className='student-gpa'>Student GPA</label>
                                <input type="text" name="studentGPA" placeholder="Student GPA" onChange={handleChange} />
                            </div>
                            <div className='col-input'>
                                <label className='school-gpa'>School GPA</label>
                                <input type="text" name="schoolGPA" placeholder="School GPA" onChange={handleChange} />
                            </div>
                        </div>

                        <div className='two-col-container'>
                            <div className='col-input'>
                                <label className='school-start'>Program Start *</label>
                                <input type="text" name="start" placeholder="Program Start" onChange={handleChange} required />
                            </div>
                            <div className='col-input'>
                                <label className='school-end'>Expected Graduation *</label>
                                <input type="text" name="end" placeholder="Expected Graduation" onChange={handleChange} required />
                            </div>
                        </div>
                        
                        <label className='school-location'>Location *</label>
                        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
                        
                        <label className='program-url'>Program URL</label>
                        <input type="text" name="url" placeholder="https://" onChange={handleChange} />

                                                
                        <div className='school-image-container'>
                            <input
                                type="file"
                                id="school-image-input"
                                name="image"
                                accept="image/*"
                                onChange={handleImageSearch}
                            />

                            <label className='school-image-button' htmlFor="school-image-input">
                                Choose Image
                            </label>

                            <span id="new-school-image-name"></span>
                            <img
                                id="new-school-image-preview"
                                alt="Preview"
                                style={{ display: form.image ? 'block' : 'none' }}
                            />
                        </div>

                        <button type="submit">Add School</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
