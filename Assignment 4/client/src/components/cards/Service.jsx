/**
 * Service component displays a service card with an image, name, and a list of descriptions.
 * 
 * The image size is clamped between 50 and 125 pixels for consistent layout. Clicking the card opens the provided URL in a new tab, if specified.
 * 
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.name - The name of the service.
 * @param {string[]} props.descriptions - An array of description strings for the service.
 * @param {string} [props.image="/logo.svg"] - The image URL for the service (defaults to "/logo.svg").
 * @param {string} [props.url=""] - The URL to open when the card is clicked (optional).
 * @param {number} [props.size=125] - The size (width and height) of the image in pixels (clamped between 50 and 125).
 * @returns {JSX.Element} The rendered service card with image, name, and descriptions.
 * 
 */

import '../../styles/components/cards/Service.css';

import { useUser } from '../../context/UserContext';

import ButtonDelete from '../buttons/ButtonDelete';
import ButtonEdit from '../buttons/ButtonEdit';

export default function Service({ id, title, descriptions, image = "/logo.svg", url = "", onClickEdit, size = 125 }) {

    const { isAdmin } = useUser();
    
    // Default image if none provided
    if (!image) image = "/logo.svg";
    
    const marginHelper = `${(150 - size) / 2}px`;

    // Map descriptions to list items
    const descriptionArray = descriptions.map((desc, index) => <li key={index}>{desc}</li>);

    return (
        <div className="service" onClick={() => url ? window.open(url, "_blank") : ""}>
            <img src={image} alt={title} width={size} height={size} style={{ marginLeft: marginHelper, marginRight: marginHelper }} />
            <div className='details'>
                <div className='service-header'>
                    <div className='service-name'>{title}</div>

                    { isAdmin ? 
                        <div className='service-admin-buttons'>
                            <ButtonEdit onClick={onClickEdit} />
                            <ButtonDelete id={id} type="services" />
                        </div>
                    : null }
                </div>

                <ul>{descriptionArray}</ul>
            </div>
        </div>
    );
}