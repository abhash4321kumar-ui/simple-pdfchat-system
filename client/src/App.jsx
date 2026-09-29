import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Menu, X } from 'lucide-react';
import { useContext, useState } from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import { Logoutfnc } from './apis/user.api';
import { useAuthContext } from './context/AuthContext';

function App() {

    let { isAuth, setIsAuth } = useAuthContext()


    const [logoutmessage, setlogoutmessage] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navLinkClass = (path) =>
        `text-sm font-medium transition-all capitalize relative group ${location.pathname === path
            ? 'text-[#16233A]'
            : 'text-[#16233A]/55 hover:text-[#16233A]'
        }`;

    const handleLogout = () => {
        if (!isAuth) {
            return
        }
        Logoutfnc();
        setTimeout(() => {
            setlogoutmessage('User logged out successfully!');
            setTimeout(() => setlogoutmessage(''), 2000);
        }, 500);
    };

    return (
        <div className="relative">
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="sticky top-0 z-50 bg-[#F6F4EE]/95 backdrop-blur-xl border-b border-[#16233A]/10 px-6 py-4"
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-10">
                        <Link
                            to="/"
                            className="font-serif text-2xl capitalize text-[#16233A] tracking-tight hover:text-[#F2A93B] transition-colors"
                        >
                            documind-ai<span className="text-[#F2A93B]">.</span>
                        </Link>

                        <div className="hidden md:flex gap-8">
                            {[
                                { path: '/', label: 'home' },
                                { path: '/dashboard', label: 'dashboard' },
                                { path: '/signup', label: 'signup' },
                                { path: '/login', label: 'login' },
                            ].map(({ path, label }) => (
                                <Link key={path} to={path} className={navLinkClass(path)}>
                                    {label}
                                    {location.pathname === path && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute -bottom-5 left-0 right-0 h-0.5 bg-[#F2A93B]"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <motion.button
                            onClick={handleLogout}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-sm font-medium px-5 py-2.5 rounded-xl border-2 border-[#16233A]/15 text-[#16233A] hover:bg-[#16233A]/5 transition-all flex items-center gap-2"
                        >
                            <LogOut size={14} />
                            {logoutmessage || 'Logout'}
                        </motion.button>
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-[#16233A]"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden mt-4 pb-4 border-t border-[#16233A]/10 pt-4"
                        >
                            <div className="flex flex-col gap-4">
                                {[
                                    { path: '/', label: 'home' },
                                    { path: '/dashboard', label: 'dashboard' },
                                    { path: '/signup', label: 'signup' },
                                    { path: '/login', label: 'login' },
                                ].map(({ path, label }) => (
                                    <Link
                                        key={path}
                                        to={path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={navLinkClass(path)}
                                    >
                                        {label}
                                    </Link>
                                ))}
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="text-sm font-medium text-left text-[#16233A]/70"
                                >
                                    Logout
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route
                        path="/"
                        element={
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Home />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Dashboard />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Signup />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Login />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/terms"
                        element={
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Terms />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/privacy"
                        element={
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <PrivacyPolicy />
                            </motion.div>
                        }
                    />
                </Routes>
            </AnimatePresence>

            <footer className="mt-20 py-8 border-t border-gray-200 text-center text-sm text-gray-500">
                <div className="flex justify-center gap-6 mb-4">
                    <Link to="/privacy" className="hover:text-[#F2A93B] transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-[#F2A93B] transition-colors">Terms of Service</Link>
                </div>
                <p>© {new Date().getFullYear()} DocuMind AI. All rights reserved.</p>
                <p className="mt-2 text-xs">Built for productivity. Do not upload classified or highly sensitive data.</p>
            </footer>
        </div>
    );
}

export default App