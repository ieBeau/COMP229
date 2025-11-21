/**
 * Services component renders a list of professional services offered.
 * 
 * Each service is displayed using the Service card component, showing the service name, a list of descriptions, and an associated image.
 * 
 * The services include Web Development, Mobile App Development, Backend Development, Full-Stack Development, Database Design, and Cloud Computing.
 * 
 * @component
 * @returns {JSX.Element} The rendered services page with a list of service cards.
 * 
 * @example
 * // Usage in a React Router setup
 * <Route path="/services" element={<Services />} />
 */

import '../styles/scenes/Services.css';

import { useState } from 'react';

import { useUser } from '../context/UserContext.jsx';
import { useData } from '../context/DataContext.jsx';

import Service from "../components/cards/Service.jsx";
import ServiceCreate from '../components/cards/ServiceCreate.jsx';
import ServiceEdit from '../components/cards/ServiceEdit.jsx';

export default function Services () {
    
    const { isAdmin } = useUser();
    const { isLoading, services } = useData();

    const [currentService, setCurrentService] = useState(null);
    const [showEditServiceForm, setShowEditServiceForm] = useState(false);
    const toggleEditServiceForm = () => {
        setShowEditServiceForm(!showEditServiceForm);
    }
    
    const [showCreateServiceForm, setShowCreateServiceForm] = useState(false);
    const toggleCreateServiceForm = () => {
        setShowCreateServiceForm(!showCreateServiceForm);
    }

    return (
        <div className="services">
        
            { showCreateServiceForm && <ServiceCreate onClose={toggleCreateServiceForm} />}
            { showEditServiceForm && <ServiceEdit service={currentService} onClose={toggleEditServiceForm} /> }

            <div className="page-title">MY SERVICES</div>

            { isAdmin && <button className="admin-banner" onClick={toggleCreateServiceForm}>Add Service</button> }
            
            <div className="list">
                {
                    isLoading ? (
                        <p className='placeholder'>Loading services...</p>
                    ) : (
                        services.length > 0 ? (
                            services.map(service => (
                                service ?
                                <Service
                                    key={service._id}
                                    id={service._id}
                                    title={service.title}
                                    descriptions={service.descriptions}
                                    image={service.image}
                                    onClickEdit={() => { toggleEditServiceForm(); setCurrentService(service); }}
                                />
                                : <></>
                            ))
                        ) : (
                            <p className='placeholder'>No services found.</p>
                        )
                    )
                }
            </div>
        </div>
    )
}