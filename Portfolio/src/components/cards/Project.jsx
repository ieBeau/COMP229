import '../../styles/components/cards/Project.css';

export default function Project({ name, descriptions, image = "/logo.svg", url = "", size = 125 }) {

    // Clamp size between 50 and 125 to center images
    if (size > 125) size = 125;
    else if (size < 50) size = 50;
    
    const marginHelper = `${(150 - size) / 2}px`;

    // Map descriptions to list items
    const descriptionArray = descriptions.map((desc, index) => <li key={index}>{desc}</li>);

    return (
        <div className="project" onClick={() => url ? window.open(url, "_blank") : ""}>
            <img src={image} alt={name} width={size} height={size} style={{ marginLeft: marginHelper, marginRight: marginHelper }} />
            <div className='details'>
                <h2 className='project-name'>{name}</h2>
                <ul>{descriptionArray}</ul>
            </div>
        </div>
    );
}