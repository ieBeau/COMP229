// UserContext.js
import { createContext, use, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

// Context
const DataContext = createContext();

// Provider
export const DataProvider = ({ children }) => {

    const { isAdmin } = useUser();

    const [projects, setProjects] = useState([]);
    const [education, setEducation] = useState([]);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const projectsData = await getProjects();
            const educationData = await getEducation();
            setProjects(projectsData);
            setEducation(educationData);
        }
        fetchData();
    }, [isAdmin]);

    useEffect(() => {
        const fetchData = async () => {
            const contactsData = await getContacts();
            setContacts(contactsData);
        }
        if (isAdmin) fetchData();
    }, [isAdmin]);

    return (
        <DataContext.Provider value={{ projects, education, contacts, setProjects, setEducation, setContacts }}>
            {children}
        </DataContext.Provider>
    );
};

const getProjects = async () => {
    const response =  await fetch('http://localhost:3000/api/projects', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Projects fetched!');
        return data;
    })
    .catch(error => {
        console.error('Error:', error);
    });

    return response;
};

const getEducation = async () => {
    const response = await fetch('http://localhost:3000/api/education', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Education fetched!');
        return data;
    })
    .catch(error => {
        console.error('Error:', error);
    });

    return response;
};

const getContacts = async () => {
    const response = await fetch('http://localhost:3000/api/contacts', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Contacts fetched!');
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
        });

    return response;
};

// Custom hook for convenience
export const useData = () => useContext(DataContext);