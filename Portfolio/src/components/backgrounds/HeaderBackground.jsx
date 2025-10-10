/**
 * BackgroundHeader component renders a grid of hexagon shapes as a decorative header background,
 * along with an animated light effect.
 *
 * The hexagons are arranged in a staggered hexagonal grid pattern, calculated based on row and column indices.
 * Each hexagon is rendered using the Hexagon component, and the AnimatedLight component overlays the grid for visual effect.
 *
 * @component
 * @returns {JSX.Element} The rendered header background with a hexagonal grid and animated light.
 *
 * @example
 * // Usage in a page header
 * <header>
 *   <BackgroundHeader />
 * </header>
 */

import '../../styles/components/backgrounds/BackgroundHeader.css';

import Hexagon from '../shapes/Hexagon';
import AnimatedLight from '../animations/AnimatedLight';

const HEXAGON_SIZE = 60;
let ROWS = 6;
let COLS = 200;

function getHexagonPosition(row, col) {
    // Calculate position based on row and column
    const x = col * HEXAGON_SIZE * 0.93;
    const y = row * HEXAGON_SIZE * 0.8;

    // Offset every other row for hex grid
    const offsetX = row % 2 === 0 ? 0 : HEXAGON_SIZE * 0.46;
    return { left: x + offsetX, top: y };
}

const BackgroundHeader = () => (
    <div className='header-background'>
        <div className='shape-layout'>
            {Array.from({ length: ROWS }).map((_, row) =>
                Array.from({ length: COLS }).map((_, col) => {
                    const { left, top } = getHexagonPosition(row, col);
                    return (
                        <div key={`${row}-${col}`} style={{ position: 'absolute', left, top }}>
                            <Hexagon size={HEXAGON_SIZE} />
                        </div>
                    );
                })
            )}
        </div>
        
        <AnimatedLight />

    </div>
);

export default BackgroundHeader;