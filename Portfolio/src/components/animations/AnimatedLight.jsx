import React, { useRef, useEffect } from 'react';

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