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

import { useUser } from '../context/UserContext.jsx';
import { useData } from '../context/DataContext.jsx';

import Service from "../components/cards/Service.jsx";

// import logoWebDev from '../assets/images/services/service-web-dev.png';
// import logoMobileDev from '../assets/images/services/service-mobile-dev.png';
// import logoBackendDev from '../assets/images/services/service-backend-dev.png';
// import logoFullstackDev from '../assets/images/services/service-fullstack-dev.png';
// import logoDatabase from '../assets/images/services/service-database.png';
// import logoCloudComputing from '../assets/images/services/service-cloud-computing.png';

export default function Services () {
    
    const { isAdmin } = useUser();
    const { isLoading, services } = useData();

    return (
        <div className="services">
            <div className="page-title">MY SERVICES</div>

            <div className="list">
                {
                    isLoading ? (
                        <p>Loading services...</p>
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
                            <p>No services found.</p>
                        )
                    )
                }
                {/* <Service
                    name="Web Development"
                    descriptions={[
                        "Building responsive and user-friendly websites using modern web technologies",
                        "Ensuring cross-browser compatibility and optimizing performance for fast load times",
                        "Implementing SEO best practices to improve search engine rankings and visibility"
                    ]}
                    image={logoWebDev}
                    size={100}
                />
                <Service
                    name="Mobile App Development"
                    descriptions={[
                        "Creating intuitive and engaging mobile applications for both iOS and Android platforms",
                        "Utilizing native and cross-platform frameworks to deliver high-quality user experiences",
                        "Integrating APIs and third-party services to enhance app functionality and user engagement"
                    ]}
                    image={logoMobileDev}
                    size={100}
                />
                <Service
                    name="Backend Development"
                    descriptions={[
                        "Designing and implementing robust server-side applications and APIs",
                        "Managing databases and ensuring data integrity and security",
                        "Optimizing server performance and scalability to handle high traffic loads"
                    ]}
                    image={logoBackendDev}
                    size={100}
                />
                <Service
                    name="Full-Stack Development"
                    descriptions={[
                        "Combining front-end and back-end development skills to build complete web applications",
                        "Ensuring seamless integration between client-side and server-side components",
                        "Utilizing a variety of technologies and frameworks to deliver end-to-end solutions"
                    ]}
                    image={logoFullstackDev}
                    size={100}
                />
                <Service
                    name="Database Design"
                    descriptions={[
                        "Designing efficient and scalable database schemas",
                        "Implementing data modeling techniques to support application requirements",
                        "Ensuring data security and compliance with industry standards"
                    ]}
                    image={logoDatabase}
                    size={100}
                />
                <Service
                    name="Cloud Computing"
                    descriptions={[
                        "Deploying and managing applications on cloud platforms like AWS, Azure, and Google Cloud",
                        "Implementing cloud infrastructure and services to support application scalability",
                        "Optimizing cloud resource usage to reduce costs and improve performance"
                    ]}
                    image={logoCloudComputing}
                    size={100}
                /> */}
            </div>
        </div>
    )
}