import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TiltCard = ({ children, className = '' }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 200, damping: 25 };
    
    const rotateX = useSpring(
        useTransform(y, [-150, 150], [8, -8]),
        springConfig
    );
    const rotateY = useSpring(
        useTransform(x, [-150, 150], [-8, 8]),
        springConfig
    );

    const glareX = useTransform(x, [-150, 150], ['0%', '100%']);
    const glareY = useTransform(y, [-150, 150], ['0%', '100%']);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            className={`group relative [perspective:1000px] ${className}`}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative h-full overflow-hidden rounded-2xl">
                {children}
                <motion.div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                        background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.3) 0%, transparent 50%)`,
                    }}
                />
            </div>
        </motion.div>
    );
};

export default TiltCard