import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const AuthModal = ({ closeModal, onLoginRedirect }) => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const { signup, googleAuth, authError, authLoading } = useAuth();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signup(formData);
        if (result.success) setMessage(result.message);
    };

    const handleGoogleSignup = async () => {
        const result = await googleAuth('signup');
        if (result.success) setMessage(result.message);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-[#16233A]/60 backdrop-blur-md flex items-center justify-center px-6 z-50"
                onClick={closeModal}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="w-full max-w-md bg-[#F6F4EE] rounded-3xl shadow-2xl p-8 relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={closeModal}
                        className="absolute top-5 right-5 text-[#16233A]/40 hover:text-[#16233A] transition-colors"
                        aria-label="Close"
                    >
                        <X size={24} />
                    </button>

                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h2 className="font-serif text-3xl text-[#16233A] mb-2">Create an account</h2>
                        <p className="text-sm text-[#16233A]/60 mb-8">
                            You'll need one to upload and chat with PDFs.
                        </p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <motion.input
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            name="username"
                            placeholder="Username"
                            required
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border-2 border-[#16233A]/15 text-sm placeholder:text-[#16233A]/30 focus:outline-none focus:border-[#F2A93B] focus:ring-4 focus:ring-[#F2A93B]/20 transition-all"
                        />
                        <motion.input
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.25 }}
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border-2 border-[#16233A]/15 text-sm placeholder:text-[#16233A]/30 focus:outline-none focus:border-[#F2A93B] focus:ring-4 focus:ring-[#F2A93B]/20 transition-all"
                        />
                        <motion.input
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border-2 border-[#16233A]/15 text-sm placeholder:text-[#16233A]/30 focus:outline-none focus:border-[#F2A93B] focus:ring-4 focus:ring-[#F2A93B]/20 transition-all"
                        />

                        <AnimatePresence>
                            {authError && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-sm capitalize text-red-600"
                                >
                                    {authError}
                                </motion.p>
                            )}
                            {message && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-sm capitalize text-green-700"
                                >
                                    {message}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        <motion.button
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.35 }}
                            type="submit"
                            disabled={authLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 rounded-xl bg-[#16233A] text-[#F6F4EE] text-sm font-semibold hover:bg-[#0F1826] disabled:opacity-60 transition-all shadow-lg"
                        >
                            {authLoading ? 'Creating account…' : 'Sign up'}
                        </motion.button>
                    </form>

                    <div className="flex items-center gap-3 my-6">
                        <div className="h-px bg-[#16233A]/10 flex-1" />
                        <span className="text-xs text-[#16233A]/40">or</span>
                        <div className="h-px bg-[#16233A]/10 flex-1" />
                    </div>

                    <motion.button
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        onClick={handleGoogleSignup}
                        disabled={authLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 rounded-xl border-2 border-[#16233A]/15 text-sm font-semibold hover:bg-[#16233A]/5 disabled:opacity-60 transition-all"
                    >
                        Continue with Google
                    </motion.button>

                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.45 }}
                        onClick={onLoginRedirect}
                        className="w-full text-center text-sm text-[#16233A]/60 hover:text-[#16233A] mt-6 transition-colors"
                    >
                        Already have an account?{' '}
                        <span className="font-semibold underline underline-offset-2">Log in</span>
                    </motion.button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AuthModal;
