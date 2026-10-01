import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Send, FileText, MessageCircle } from 'lucide-react';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../hooks/useAuth';
import { useChat } from '../hooks/useChat';
import { useAuthContext } from '../context/AuthContext';
import { useLoading } from '../context/LoadingContext';
import MagneticButton from '../components/MagneticButton';

const Dashboard = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [currentMsg, setCurrentMsg] = useState('');
    const fileInputRef = useRef(null);
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    const { isAuth, isUploaded } = useAuthContext();
    const { isLoading } = useLoading();
    const { loadSession } = useAuth();
    const { chatMessages, headerStatus, isUploading, isTyping, sendMessage, uploadPdf } = useChat();

    useEffect(() => {
        loadSession();
    }, []);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, [chatMessages, isTyping]);

    const handleUploadClick = () => {
        if (!isAuth) setShowAuthModal(true);
        else fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) uploadPdf(file);
    };

    const handleSend = () => {
        if (!currentMsg.trim()) return;
        sendMessage(currentMsg);
        setCurrentMsg('');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F6F4EE] flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 text-[#16233A]/50 text-sm"
                >
                    <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-[#16233A]/20 border-t-[#16233A] rounded-full"
                    />
                    Loading your session…
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F6F4EE] px-6 py-5 relative overflow-hidden">
            {/* Animated background particles */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#F2A93B]/10 blur-3xl pointer-events-none"
            />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex items-center justify-end mb-5"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-xs px-4 py-2 rounded-full bg-gradient-to-r from-[#16233A]/10 to-[#F2A93B]/10 text-[#16233A]/70 font-medium backdrop-blur-sm border border-[#16233A]/10"
                    >
                        {headerStatus}
                    </motion.div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!isUploaded ? (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white border border-[#16233A]/10 rounded-3xl py-24 px-8 text-center shadow-xl relative overflow-hidden"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute inset-0 bg-gradient-to-br from-[#F2A93B]/5 to-transparent"
                            />

                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', delay: 0.2 }}
                                className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F2A93B]/20 to-[#B9862C]/20 flex items-center justify-center text-3xl mx-auto mb-6 relative z-10"
                            >
                                <FileText className="text-[#B9862C]" size={32} />
                            </motion.div>

                            <motion.h2
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="font-serif text-3xl text-[#16233A] mb-3 relative z-10"
                            >
                                Upload a PDF to begin
                            </motion.h2>

                            <motion.p
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-base text-[#16233A]/60 mb-8 max-w-md mx-auto relative z-10"
                            >
                                Reports, papers, contracts — drop one in and start asking questions.
                            </motion.p>

                            <motion.div
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="relative z-10"
                            >
                                <MagneticButton
                                    onClick={handleUploadClick}
                                    disabled={isUploading}
                                    className={isUploading ? 'opacity-60' : ''}
                                >
                                    <Upload size={16} />
                                    {isUploading ? 'Uploading…' : 'Select PDF'}
                                </MagneticButton>
                            </motion.div>

                            <input
                                type="file"
                                accept="application/pdf"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white border border-[#16233A]/10 rounded-3xl shadow-2xl flex flex-col h-[500px] overflow-hidden"
                        >
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="px-6 py-5 border-b border-[#16233A]/10 flex items-center gap-3 bg-gradient-to-r from-[#F2A93B]/5 to-transparent"
                            >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F2A93B]/30 to-[#B9862C]/30 flex items-center justify-center">
                                    <MessageCircle className="text-[#16233A]" size={18} />
                                </div>
                                <h3 className="font-serif text-lg text-[#16233A]">Chat with your PDF</h3>
                            </motion.div>

                            <div
                                ref={scrollRef}
                                className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4 no-scrollbar"
                            >
                                <AnimatePresence>
                                    {chatMessages.map((msg, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                            className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${
                                                msg.sender === 'user'
                                                    ? 'self-end bg-[#16233A] text-[#F6F4EE] rounded-br-md shadow-lg'
                                                    : 'self-start bg-gradient-to-br from-[#F2A93B]/20 to-[#F2A93B]/5 text-[#16233A] rounded-bl-md border border-[#F2A93B]/20'
                                            }`}
                                        >
                                            {msg.sender === 'ai' ? (
                                                <div className="prose prose-sm max-w-none prose-p:my-1">
                                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                                </div>
                                            ) : (
                                                msg.text
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="self-start flex items-center gap-1.5 px-5 py-3"
                                    >
                                        {[0, 1, 2].map((i) => (
                                            <motion.span
                                                key={i}
                                                animate={{ y: [0, -8, 0] }}
                                                transition={{
                                                    duration: 0.6,
                                                    repeat: Infinity,
                                                    delay: i * 0.15,
                                                }}
                                                className="w-2 h-2 rounded-full bg-[#16233A]/40"
                                            />
                                        ))}
                                    </motion.div>
                                )}
                            </div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="px-5 py-5 border-t border-[#16233A]/10 flex items-center gap-3 bg-[#F6F4EE]/50"
                            >
                                <input
                                    type="text"
                                    value={currentMsg}
                                    onChange={(e) => setCurrentMsg(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask a question about your PDF…"
                                    className="flex-1 px-4 py-3 rounded-xl border-2 border-[#16233A]/15 text-sm placeholder:text-[#16233A]/30 focus:outline-none focus:border-[#F2A93B] focus:ring-4 focus:ring-[#F2A93B]/20 transition-all bg-white"
                                />
                                <motion.button
                                    onClick={handleSend}
                                    disabled={!currentMsg.trim()}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-5 py-3 rounded-xl bg-[#16233A] text-[#F6F4EE] font-medium hover:bg-[#0F1826] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg flex items-center gap-2"
                                >
                                    <Send size={16} />
                                    Send
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {showAuthModal && (
                    <AuthModal
                        closeModal={() => setShowAuthModal(false)}
                        onLoginRedirect={() => navigate('/login')}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};


export default Dashboard;
