import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import MagneticButton from '../components/MagneticButton';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login, googleAuth, authError, authLoading } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result.success) navigate('/dashboard');
    };

    const handleGoogleLogin = async () => {
        const result = await googleAuth('login');
        if (result.success) navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-[#F6F4EE] flex items-center justify-center px-6 relative overflow-hidden">
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#F2A93B]/15 blur-3xl"
            />
            <motion.div
                animate={{
                    x: [0, -30, 0],
                    y: [0, 40, 0],
                }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#16233A]/10 blur-3xl"
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <Link to="/" className="font-serif text-3xl text-[#16233A] inline-block capitalize">
                        documind-ai<span className="text-[#F2A93B]">.</span>
                    </Link>
                    <motion.h1
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="font-serif text-4xl text-[#16233A] mt-8 mb-2"
                    >
                        Welcome back
                    </motion.h1>
                    <motion.p
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-sm text-[#16233A]/60"
                    >
                        Sign in to pick up where you left off
                    </motion.p>
                </div>

                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl border border-[#16233A]/10 shadow-2xl p-8"
                >
                    <form onSubmit={handleLogin} className="flex flex-col gap-5">
                        <div>
                            <label className="block text-xs font-semibold text-[#16233A]/70 mb-2 flex items-center gap-2">
                                <Mail size={14} />
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-xl border-2 border-[#16233A]/15 text-sm text-[#16233A] placeholder:text-[#16233A]/30 focus:outline-none focus:border-[#F2A93B] focus:ring-4 focus:ring-[#F2A93B]/20 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#16233A]/70 mb-2 flex items-center gap-2">
                                <Lock size={14} />
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl border-2 border-[#16233A]/15 text-sm text-[#16233A] placeholder:text-[#16233A]/30 focus:outline-none focus:border-[#F2A93B] focus:ring-4 focus:ring-[#F2A93B]/20 transition-all"
                            />
                        </div>

                        {authError && (
                            <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="text-sm text-red-600"
                            >
                                {authError}
                            </motion.p>
                        )}

                        <MagneticButton
                            onClick={handleLogin}
                            disabled={authLoading}
                            className="w-full justify-center mt-2"
                        >
                            <LogIn size={16} />
                            {authLoading ? 'Signing in…' : 'Sign in'}
                        </MagneticButton>
                    </form>

                    <div className="flex items-center gap-3 my-6">
                        <div className="h-px bg-[#16233A]/10 flex-1" />
                        <span className="text-xs text-[#16233A]/40">or</span>
                        <div className="h-px bg-[#16233A]/10 flex-1" />
                    </div>

                    <motion.button
                        onClick={handleGoogleLogin}
                        disabled={authLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 rounded-xl border-2 border-[#16233A]/15 text-sm font-semibold text-[#16233A] hover:bg-[#16233A]/5 disabled:opacity-60 transition-all"
                    >
                        Continue with Google
                    </motion.button>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-sm text-[#16233A]/60 mt-8"
                >
                    Don't have an account?{' '}
                    <Link
                        to="/dashboard"
                        className="text-[#16233A] font-semibold hover:text-[#F2A93B] transition-colors underline underline-offset-2"
                    >
                        Get started from the dashboard
                    </Link>
                </motion.p>
            </motion.div>
        </div>
    );
};


export default Login;
