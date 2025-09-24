import '../styles/scenes/Services.css';

import Service from "../components/Service";

export default function Services () {
    return (
        <div className="services">
            <h1>My Services</h1>

            <div className="list">
                <Service
                    name="Web Development"
                    descriptions={[
                        "Building responsive and user-friendly websites using modern web technologies",
                        "Ensuring cross-browser compatibility and optimizing performance for fast load times",
                        "Implementing SEO best practices to improve search engine rankings and visibility"
                    ]}
                    image="/logo-webdev.svg"
                    size={100}
                />
                <Service
                    name="Mobile App Development"
                    descriptions={[
                        "Creating intuitive and engaging mobile applications for both iOS and Android platforms",
                        "Utilizing native and cross-platform frameworks to deliver high-quality user experiences",
                        "Integrating APIs and third-party services to enhance app functionality and user engagement"
                    ]}
                    image="/logo-mobiledev.svg"
                    size={100}
                />
                <Service
                    name="Backend Development"
                    descriptions={[
                        "Designing and implementing robust server-side applications and APIs",
                        "Managing databases and ensuring data integrity and security",
                        "Optimizing server performance and scalability to handle high traffic loads"
                    ]}
                    image="/logo-backenddev.svg"
                    size={100}
                />
                <Service
                    name="Database Design"
                    descriptions={[
                        "Designing efficient and scalable database schemas",
                        "Implementing data modeling techniques to support application requirements",
                        "Ensuring data security and compliance with industry standards"
                    ]}
                    image="/logo-databasedesign.svg"
                    size={100}
                />
                <Service
                    name="API Integration"
                    descriptions={[
                        "Connecting third-party services and APIs to enhance application functionality",
                        "Implementing RESTful and GraphQL APIs for seamless data exchange",
                        "Ensuring API security and performance optimization"
                    ]}
                    image="/logo-apiintegration.svg"
                    size={100}
                />
                <Service
                    name="Cloud Computing"
                    descriptions={[
                        "Deploying and managing applications on cloud platforms like AWS, Azure, and Google Cloud",
                        "Implementing cloud infrastructure and services to support application scalability",
                        "Optimizing cloud resource usage to reduce costs and improve performance"
                    ]}
                    image="/logo-cloudcomputing.svg"
                    size={100}
                />
            </div>
        </div>
    )
}