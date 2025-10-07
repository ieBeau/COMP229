/**
 * AnimatedLight component renders a glowing light effect that follows the user's mouse cursor.
 * 
 * The light is implemented as an absolutely positioned div styled with a radial gradient and shadow,
 * and its position updates in response to mouse movements across the window. The light is non-interactive
 * and appears behind other content due to its negative z-index.
 * 
 * @component
 * @returns {JSX.Element} The animated light effect that follows the mouse cursor.
 * 
 * @example
 * // Usage in a React application
 * <AnimatedLight />
 */

import { useRef, useEffect } from 'react';

const lightSize = 250;

const AnimatedLight = () => {
    const lightRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = e.clientX;
            const y = e.clientY;
            if (lightRef.current) {
                lightRef.current.style.left = `${x - lightSize / 2}px`;
                lightRef.current.style.top = `${y - lightSize / 2}px`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            <div
                ref={lightRef}
                style={{
                    position: 'absolute',
                    pointerEvents: 'none',
                    width: `${lightSize}px`,
                    height: `${lightSize}px`,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 233,0.2) 60%, transparent 100%)',
                    boxShadow: '0 0 40px 20px rgba(255, 255, 233, 0.3)',
                    transition: 'left 0.05s, top 0.05s',
                    opacity: 0.3,
                    zIndex: -1
                }}
            />
        </>
    );
};

export default AnimatedLight;