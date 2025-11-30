/**
 * DataProvider component that creates and provides the DataContext for application data.
 *
 * The provider fetches and exposes collections of projects, education, services, and (for admins) contacts.
 * - It relies on authentication state from useUser to determine when to fetch data:
 *   - When a user is present it fetches projects, education, and services.
 *   - When isAdmin is true it fetches contacts.
 * - Exposes an isLoading flag while the initial (non-admin) data loads.
 * - Exposes setter functions for each collection to allow consumer components to update local state.
 * - Data fetching is performed via the fetchApi utility and encapsulated in helper functions
 *   (getProjects, getEducation, getServices, getContacts).
 *
 * Provided context shape:
 * { isLoading, projects, education, services, contacts, setProjects, setEducation, setServices, setContacts }
 *
 * @component
 * @returns {JSX.Element} A DataContext provider wrapping children which supplies application data and mutation functions.
 *
 * @example
 * // Wrap the app so any component can access the shared data via the custom hook
 * <DataProvider>
 *   <App />
 * </DataProvider>
 *
 * @example
 * // Consume data in a component using the provided hook
 * const { isLoading, projects, setProjects } = useData();
 */

// DataContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { fetchApi } from "../utils/api";

// Context
const DataContext = createContext();

// Provider
export const DataProvider = ({ children }) => {

    const { user, isAdmin } = useUser();

    const [isLoading, setIsLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [education, setEducation] = useState([]);
    const [services, setServices] = useState([]);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const projectsData = await getProjects();
            const educationData = await getEducation();
            const servicesData = await getServices();
            setProjects(projectsData);
            setEducation(educationData);
            setServices(servicesData);
            setIsLoading(false);
        }
        if (user) fetchData();
    }, [user]);

    useEffect(() => {
        const fetchData = async () => {
            const contactsData = await getContacts();
            setContacts(contactsData);
        }
        if (isAdmin) fetchData();
    }, [isAdmin]);

    return (
        <DataContext.Provider value={{ isLoading, projects, education, services, contacts, setProjects, setEducation, setServices, setContacts }}>
            {children}
        </DataContext.Provider>
    );
};

const getProjects = async () => {
    const response =  await fetchApi(`/projects`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        console.error('Error:', error);
    });

    return response;
};

const getEducation = async () => {
    const response = await fetchApi(`/education`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        console.error('Error:', error);
    });

    return response;
};

const getServices = async () => {
    const response = await fetchApi(`/services`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        console.error('Error:', error);
    });
    return response;
}

const getContacts = async () => {
    const response = await fetchApi(`/contacts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.error('Error:', error);
        });

    return response;
};

// Custom hook for convenience
export const useData = () => useContext(DataContext);