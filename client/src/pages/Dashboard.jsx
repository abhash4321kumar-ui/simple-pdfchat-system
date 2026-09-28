import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../hooks/useAuth';
import { useChat } from '../hooks/useChat';
import { useAuthContext } from '../context/AuthContext';
import { useLoading } from '../context/LoadingContext';

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
                <div className="flex items-center gap-3 text-[#16233A]/50 text-sm">
                    <span className="w-4 h-4 border-2 border-[#16233A]/20 border-t-[#16233A] rounded-full animate-spin" />
                    Loading your session…
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F6F4EE] px-6 py-10">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-end mb-6">
                    <div className="text-xs px-3 py-1.5 rounded-full bg-[#16233A]/5 text-[#16233A]/70 font-medium">
                        {headerStatus}
                    </div>
                </div>

                {!isUploaded ? (
                    <div className="bg-white border border-[#16233A]/10 rounded-2xl py-20 px-6 text-center shadow-sm">
                        <div className="w-14 h-14 rounded-full bg-[#F2A93B]/15 flex items-center justify-center text-2xl mx-auto mb-5">
                            📄
                        </div>
                        <h2 className="font-serif text-xl text-[#16233A] mb-2">Upload a PDF to begin</h2>
                        <p className="text-sm text-[#16233A]/60 mb-7 max-w-xs mx-auto">
                            Reports, papers, contracts — drop one in and start asking questions.
                        </p>
                        <button
                            onClick={handleUploadClick}
                            disabled={isUploading}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#16233A] text-[#F6F4EE] text-sm font-medium hover:bg-[#0F1826] disabled:opacity-60 transition-colors"
                        >
                            {isUploading ? 'Uploading…' : 'Select PDF'}
                        </button>
                        <input
                            type="file"
                            accept="application/pdf"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                ) : (
                    <div className="bg-white border border-[#16233A]/10 rounded-2xl shadow-sm flex flex-col h-[640px] overflow-hidden">
                        <div className="px-6 py-4 border-b border-[#16233A]/10 flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#F2A93B]/15 flex items-center justify-center text-sm">💬</div>
                            <h3 className="font-serif text-base text-[#16233A]">Chat with your PDF</h3>
                        </div>

                        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4 no-scrollbar">
                            {chatMessages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                            ? 'self-end bg-[#16233A] text-[#F6F4EE] rounded-br-sm'
                                            : 'self-start bg-[#F2A93B]/15 text-[#16233A] rounded-bl-sm'
                                        }`}
                                >
                                    {msg.sender === 'ai' ? (
                                        <div className="prose prose-sm max-w-none prose-p:my-1">
                                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                                        </div>
                                    ) : (
                                        msg.text
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="self-start flex items-center gap-1 px-4 py-2.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#16233A]/40 animate-bounce [animation-delay:-0.3s]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#16233A]/40 animate-bounce [animation-delay:-0.15s]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#16233A]/40 animate-bounce" />
                                </div>
                            )}
                        </div>

                        <div className="px-4 py-4 border-t border-[#16233A]/10 flex items-center gap-2">
                            <input
                                type="text"
                                value={currentMsg}
                                onChange={(e) => setCurrentMsg(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask a question about your PDF…"
                                className="flex-1 px-4 py-2.5 rounded-lg border border-[#16233A]/15 text-sm placeholder:text-[#16233A]/30 focus:outline-none focus:ring-2 focus:ring-[#F2A93B]/50 focus:border-[#F2A93B] transition-colors"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!currentMsg.trim()}
                                className="px-5 py-2.5 rounded-lg bg-[#16233A] text-[#F6F4EE] text-sm font-medium hover:bg-[#0F1826] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {showAuthModal && (
                <AuthModal
                    closeModal={() => setShowAuthModal(false)}
                    onLoginRedirect={() => navigate('/login')}
                />
            )}
        </div>
    );
};

export default Dashboard;
