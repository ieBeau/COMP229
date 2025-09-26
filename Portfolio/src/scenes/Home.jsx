import '../styles/scenes/Home.css';

export default function Home () {
    return (
        <div className="home">
            
            <p>Welcome to my portfolio. Here you will find a showcase of all my work and projects.</p>

            <p className="mission-statement">
                
                <h2>Mission Statement</h2>

                My mission is to design and develop innovative, reliable, and scalable software solutions that solve real-world problems. 
                I strive to combine technical expertise with creativity and collaboration, building systems that not only perform but also create meaningful impact. 
                Guided by values of respect, fairness, and continuous learning, I aim to grow as a professional and ultimately contribute to groundbreaking technologies that shape the future of how people connect and innovate.
            </p>

            <button onClick={() => window.location.href = '/about'}>Learn More</button>
        </div>
    )
}