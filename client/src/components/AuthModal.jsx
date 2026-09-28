import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

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
        <div className="fixed inset-0 bg-[#16233A]/40 backdrop-blur-sm flex items-center justify-center px-6 z-50">
            <div className="w-full max-w-sm bg-[#F6F4EE] rounded-2xl shadow-xl p-7 relative">
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-[#16233A]/40 hover:text-[#16233A] text-lg leading-none"
                    aria-label="Close"
                >
                    ✕
                </button>

                <h2 className="font-serif text-2xl text-[#16233A] mb-1">Create an account</h2>
                <p className="text-sm text-[#16233A]/60 mb-6">You'll need one to upload and chat with PDFs.</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                    <input
                        name="username"
                        placeholder="Username"
                        required
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#16233A]/15 text-sm placeholder:text-[#16233A]/30 focus:outline-none focus:ring-2 focus:ring-[#F2A93B]/50 focus:border-[#F2A93B] transition-colors"
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#16233A]/15 text-sm placeholder:text-[#16233A]/30 focus:outline-none focus:ring-2 focus:ring-[#F2A93B]/50 focus:border-[#F2A93B] transition-colors"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#16233A]/15 text-sm placeholder:text-[#16233A]/30 focus:outline-none focus:ring-2 focus:ring-[#F2A93B]/50 focus:border-[#F2A93B] transition-colors"
                    />

                    {authError && <p className="text-sm capitalize text-red-600">{authError}</p>}
                    {message && <p className="text-sm capitalize text-green-700">{message}</p>}

                    <button
                        type="submit"
                        disabled={authLoading}
                        className="w-full py-2.5 rounded-lg bg-[#16233A] text-[#F6F4EE] text-sm font-medium hover:bg-[#0F1826] disabled:opacity-60 transition-colors mt-1"
                    >
                        {authLoading ? 'Creating account…' : 'Sign up'}
                    </button>
                </form>

                <div className="flex items-center gap-3 my-5">
                    <div className="h-px bg-[#16233A]/10 flex-1" />
                    <span className="text-xs text-[#16233A]/40">or</span>
                    <div className="h-px bg-[#16233A]/10 flex-1" />
                </div>

                <button
                    onClick={handleGoogleSignup}
                    disabled={authLoading}
                    className="w-full py-2.5 rounded-lg border border-[#16233A]/15 text-sm font-medium hover:bg-[#16233A]/5 disabled:opacity-60 transition-colors"
                >
                    Continue with Google
                </button>

                <button
                    onClick={onLoginRedirect}
                    className="w-full text-center text-sm text-[#16233A]/60 hover:text-[#16233A] mt-5"
                >
                    Already have an account? <span className="font-medium underline underline-offset-2">Log in</span>
                </button>
            </div>
        </div>
    );
};

export default AuthModal;
