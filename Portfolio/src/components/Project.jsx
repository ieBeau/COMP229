
export default function Project({ name, description, image = "" }) {
    return (
        <>
            <h3>{name}</h3>
            <img src={image} alt={name} />
            <p>{description}</p>
        </>
    );
}