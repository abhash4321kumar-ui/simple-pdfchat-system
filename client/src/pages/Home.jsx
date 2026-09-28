import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BookOpen, Zap, Quote, Clock, FileText, MessageCircle, Sparkles } from 'lucide-react';
import Reveal from '../components/Reveal';
import TiltCard from '../components/TiltCard';
import MagneticButton from '../components/MagneticButton';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import FloatingDocument from '../components/FloatingDocument';

const Home = () => {
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);

    const features = [
        {
            icon: BookOpen,
            title: 'Multi-page understanding',
            description: 'Connect the dots across every page of your document'
        },
        {
            icon: Zap,
            title: 'Instant answers',
            description: 'Get clear, useful answers in seconds—not search results'
        },
        {
            icon: Quote,
            title: 'Source citations',
            description: 'Page-level references for every answer you receive'
        },
        {
            icon: Clock,
            title: 'Chat history',
            description: 'Your questions and insights stay organized forever'
        }
    ];

    const steps = [
        {
            num: '01',
            icon: FileText,
            title: 'Upload',
            description: 'Drop in any PDF—papers, reports, contracts. No formatting required.',
            color: 'from-[#F2A93B]/20 to-[#F2A93B]/5'
        },
        {
            num: '02',
            icon: MessageCircle,
            title: 'Ask',
            description: 'Ask questions in plain language. Follow wherever curiosity leads.',
            color: 'from-[#16233A]/20 to-[#16233A]/5'
        },
        {
            num: '03',
            icon: Sparkles,
            title: 'Understand',
            description: 'Get grounded answers with citations that make action easy.',
            color: 'from-[#B9862C]/20 to-[#B9862C]/5'
        }
    ];

    return (
        <div className="min-h-screen bg-[#F6F4EE] text-[#16233A] overflow-hidden">
            <AnimatedBackground />

            <motion.section
                style={{ y: heroY, opacity: heroOpacity }}
                className="relative min-h-[85vh] flex items-center"
            >
                <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
                    <Reveal>
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B9862C]"
                            >
                                <span className="h-px w-10 bg-[#B9862C]" />
                                PDF Q&A, without the skimming
                            </motion.div>

                            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
                                Drop in a document,
                                <br />
                                <motion.span
                                    initial={{ backgroundPosition: '0% 50%' }}
                                    animate={{ backgroundPosition: '100% 50%' }}
                                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                                    className="bg-gradient-to-r from-[#F2A93B] via-[#B9862C] to-[#F2A93B] bg-clip-text text-transparent bg-[length:200%_auto]"
                                >
                                    pull out
                                </motion.span>{' '}
                                the answer.
                            </h1>

                            <p className="text-lg md:text-xl text-[#16233A]/70 max-w-xl leading-relaxed">
                                Upload any PDF and ask it questions directly. No more scrolling through
                                fifty pages to find one paragraph.
                            </p>

                            <div className="flex flex-wrap whitespace-nowrap items-center gap-5 pt-4">
                                <MagneticButton onClick={() => navigate('/login')}>
                                    Get started free <ArrowRight size={16} />
                                </MagneticButton>
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-sm text-[#16233A]/50"
                                >
                                    Free to try · no card needed
                                </motion.span>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="flex items-center gap-3 pt-6"
                            >
                                <div className="flex -space-x-3">
                                    {['#D7B59B', '#9DB5A5', '#D5C18A', '#B9A78F'].map((color, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.7 + i * 0.1, type: 'spring' }}
                                            className="w-10 h-10 rounded-full border-2 border-[#F6F4EE] grid place-items-center text-xs font-bold"
                                            style={{ backgroundColor: color }}
                                        >
                                            {String.fromCharCode(65 + i)}
                                        </motion.div>
                                    ))}
                                </div>
                                <span className="text-sm text-[#16233A]/60">
                                    Join 12,000+ curious readers
                                </span>
                            </motion.div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.3}>
                        <FloatingDocument />
                    </Reveal>
                </div>
            </motion.section>

            {/* How It Works */}
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <Reveal>
                        <div className="text-center mb-16">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B9862C] mb-4">
                                A clearer way forward
                            </p>
                            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl">
                                Three steps between you and <em className="text-[#F2A93B]">aha.</em>
                            </h2>
                        </div>
                    </Reveal>

                    <div className="grid md:grid-cols-3 gap-6">
                        {steps.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <Reveal key={i} delay={i * 0.15}>
                                    <TiltCard>
                                        <motion.div
                                            whileHover={{ y: -8 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                            className={`h-full bg-gradient-to-br ${step.color} backdrop-blur-sm border border-[#16233A]/10 rounded-2xl p-8 relative overflow-hidden`}
                                        >
                                            <div className="relative z-10">
                                                <div className="flex items-center justify-between mb-8">
                                                    <span className="font-serif text-4xl text-[#B9862C]">
                                                        {step.num}
                                                    </span>
                                                    <Icon className="text-[#16233A]/60" size={28} strokeWidth={1.5} />
                                                </div>
                                                <h3 className="font-serif text-3xl mb-4 tracking-tight">
                                                    {step.title}
                                                </h3>
                                                <p className="text-[#16233A]/65 leading-relaxed">
                                                    {step.description}
                                                </p>
                                            </div>
                                            <motion.div
                                                className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-white/30 blur-3xl"
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                    opacity: [0.3, 0.5, 0.3],
                                                }}
                                                transition={{
                                                    duration: 4,
                                                    repeat: Infinity,
                                                    delay: i * 0.5,
                                                }}
                                            />
                                        </motion.div>
                                    </TiltCard>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 bg-white/40 border-y border-[#16233A]/10">
                <div className="max-w-7xl mx-auto px-6">
                    <Reveal>
                        <div className="text-center mb-16">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B9862C] mb-4">
                                Built for deep work
                            </p>
                            <h2 className="font-serif text-5xl md:text-6xl">
                                The details that make a difference.
                            </h2>
                        </div>
                    </Reveal>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, i) => {
                            const Icon = feature.icon;
                            return (
                                <Reveal key={i} delay={i * 0.1}>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: 'spring', stiffness: 400 }}
                                        className="bg-white border border-[#16233A]/10 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-[#F2A93B]/15 grid place-items-center mb-6">
                                            <Icon className="text-[#B9862C]" size={24} strokeWidth={1.5} />
                                        </div>
                                        <h3 className="font-serif text-xl mb-3">{feature.title}</h3>
                                        <p className="text-sm text-[#16233A]/65 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </motion.div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 relative overflow-hidden">
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-[#F2A93B]/20 blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 40, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute -left-32 -bottom-32 w-96 h-96 rounded-full bg-[#16233A]/10 blur-3xl"
                />

                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <Reveal>
                        <motion.div
                            initial={{ scale: 0.9 }}
                            whileInView={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="bg-gradient-to-br from-[#F2A93B] to-[#B9862C] rounded-3xl p-12 md:p-16 shadow-2xl"
                        >
                            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#16233A] mb-6">
                                Read less.
                                <br />
                                Understand more.
                            </h2>
                            <p className="text-lg text-[#16233A]/80 mb-10 max-w-xl mx-auto">
                                Start turning your documents into momentum today.
                            </p>
                            <MagneticButton
                                onClick={() => navigate('/login')}
                                className="bg-[#16233A] hover:bg-[#0F1826] shadow-2xl"
                            >
                                Get started for free <ArrowRight size={16} />
                            </MagneticButton>
                        </motion.div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
};

export default Home;
