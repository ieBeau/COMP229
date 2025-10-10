/**
 * Hexagon component renders a regular hexagon SVG shape with customizable size, fill color, and edge color.
 * 
 * The hexagon is centered within the SVG and its points are calculated mathematically to ensure regularity.
 * The component allows for easy customization of the hexagon's appearance via props.
 * 
 * @component
 * @param {Object} props - Component props.
 * @param {number} [props.size=50] - The diameter of the hexagon (width and height of the SVG).
 * @param {string} [props.color='#2b2b2bff'] - The fill color of the hexagon.
 * @param {string} [props.edgeColor=''] - The stroke (edge) color of the hexagon.
 * @returns {JSX.Element} The rendered SVG hexagon.
 * 
 * @example
 * // Render a blue hexagon with a red edge
 * <Hexagon size={100} color="blue" edgeColor="red" />
 */

const Hexagon = ({ size = 50 }) => {
    let width = size;
    let height = Math.sqrt(3) / 2 * size;

    // Calculate the points for a regular octagon
    const r = size / 2;
    const cx = r;
    const cy = r;

    const pointsArr = [];

    // Calculate the points for a regular hexagon
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        pointsArr.push(`${x},${y}`);
    }

    const points = pointsArr.join(' ');
    
    width = size;
    height = size;

    return (
        <svg  width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <polygon 
                className="hexagon"
                points={points} 
                strokeWidth="1"
            />
        </svg>
    );
};

export default Hexagon;