const Hexagon = ({ size = 50, color = '#2b2b2bff', edgeColor = '' }) => {
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
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <polygon 
                points={points} 
                fill={color} 
                stroke={edgeColor} 
                strokeWidth="1"
            />
        </svg>
    );
};

export default Hexagon;