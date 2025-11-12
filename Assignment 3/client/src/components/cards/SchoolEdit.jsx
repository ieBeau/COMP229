import '../../styles/components/cards/SchoolEdit.css';

import { useEffect, useState } from "react";
import { useData } from '../../context/DataContext';

const SERVER_URL = import.meta.env.PROD ? (import.meta.env.VITE_SERVER_URL || '') : '';

export default function SchoolEdit ({ school, onClose }) {

    const { education, setEducation } = useData();

    const [form, setForm] = useState({
        firstname: school.firstname,
        lastname: school.lastname,
        email: school.email,
        school: school.school,
        program: school.program,
        degree: school.degree,
        studentGPA: school.studentGPA,
        schoolGPA: school.schoolGPA,
        start: school.start,
        end: school.end,
        location: school.location,
        url: school.url,
        image: school.image
    });
    
    const formatDate= (dateStr) => {
        if (!dateStr) return "";

        const date = new Date(dateStr);

        if (isNaN(date)) return dateStr;

        return date.toLocaleString(undefined, { month: "2-digit", day: "2-digit", year: "numeric" });
    };

    useEffect(() => {
        try {
            const schoolEl = document.querySelector('input[name="school"]');
            if (schoolEl) schoolEl.value = form.school ?? '';

            const programEl = document.querySelector('input[name="program"]');
            if (programEl) programEl.value = form.program ?? '';
            
            const degreeEl = document.querySelector('input[name="degree"]');
            if (degreeEl) degreeEl.value = form.degree ?? '';

            const studentGPAEl = document.querySelector('input[name="studentGPA"]');
            if (studentGPAEl) studentGPAEl.value = form.studentGPA ?? '';
            
            const schoolGPAEl = document.querySelector('input[name="schoolGPA"]');
            if (schoolGPAEl) schoolGPAEl.value = form.schoolGPA ?? '';
    
            const startEl = document.querySelector('input[name="start"]');
            if (startEl) startEl.value = formatDate(form.start) ?? '';
            
            const endEl = document.querySelector('input[name="end"]');
            if (endEl) endEl.value = formatDate(form.end) ?? '';

            const locationEl = document.querySelector('input[name="location"]');
            if (locationEl) locationEl.value = form.location ?? '';
            
            const urlEl = document.querySelector('input[name="url"]');
            if (urlEl) urlEl.value = form.url ?? '';

            const img = document.getElementById('new-school-image-preview');
            const nameSpan = document.getElementById('new-school-image-name');

            if (form.image) img.src = form.image;
            if (form.image && typeof form.image === 'string') nameSpan.textContent = `${form.school.toLowerCase().replaceAll(' ','-')}.${form.image.split(';')[0].split('/').pop()}`;
          
        } catch (err) {
            // ignore DOM errors during initial mount
        }
    }, []);

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

        fetch(`${SERVER_URL}/api/education/${school._id}`, {
            method: 'PUT',
            credentials: 'include',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            setEducation(education.map(edu => 
                edu._id === school._id ? { ...edu, ...data } : edu
            ));
        })
        .catch(error => {
            console.error('Error:', error);
        });
    
        onClose();
    };

    return (
        <div className="edit-school-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="edit-school-container">
                <button className="close-button" onClick={onClose}>✖</button>
                
                <div className="form-container" onClick={(e) => e.stopPropagation()}>
                    
                    <h2>Edit School</h2>

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

                        <button type="submit">Accept</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
