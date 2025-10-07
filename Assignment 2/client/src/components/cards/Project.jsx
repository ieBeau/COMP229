/**
 * Project component displays a project card with an image, name, and a list of descriptions.
 * 
 * The component clamps the image size between 50 and 125 pixels for consistent layout, and centers the image using calculated margins.
 * Clicking the card opens the project's URL in a new browser tab if a URL is provided.
 * 
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.name - The name of the project.
 * @param {string[]} props.descriptions - An array of description strings for the project.
 * @param {string} [props.image="/logo.svg"] - The image URL for the project (defaults to "/logo.svg").
 * @param {string} [props.url=""] - The URL to open when the card is clicked (optional).
 * @param {number} [props.size=125] - The size (width and height) of the project image in pixels (clamped between 50 and 125).
 * @returns {JSX.Element} The rendered project card with image, name, and descriptions.
 * 
 */

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
                <div className='project-name'>{name}</div>
                <ul>{descriptionArray}</ul>
            </div>
        </div>
    );
}