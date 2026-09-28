import { motion, useMotionValue, useSpring } from 'framer-motion';

const MagneticButton = ({ children, onClick, className = '', disabled = false }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 250, damping: 20 };
    const sx = useSpring(x, springConfig);
    const sy = useSpring(y, springConfig);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        x.set((e.clientX - centerX) * 0.15);
        y.set((e.clientY - centerY) * 0.15);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            style={{ x: sx, y: sy }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileTap={{ scale: 0.95, y: 2 }}
            whileHover={{ scale: 1.02 }}
            onClick={onClick}
            disabled={disabled}
            className={`relative inline-flex items-center justify-center gap-2 rounded-xl bg-[#16233A] px-6 py-3.5 text-sm font-semibold text-[#F6F4EE] shadow-[0_12px_28px_rgba(22,35,58,.2)] transition-all hover:bg-[#243653] hover:shadow-[0_20px_35px_rgba(22,35,58,.3)] disabled:opacity-60 disabled:cursor-not-allowed ${className} whitespace-nowrap`}
        >
            <span className="relative z-10 flex gap-2 items-center justify-center">{children}</span>
            <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#F2A93B]/0 via-[#F2A93B]/20 to-[#F2A93B]/0"
                animate={{
                    x: ['-100%', '100%'],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
        </motion.button>
    );
};

export default MagneticButton