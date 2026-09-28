import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

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
        <div className="min-h-screen bg-[#F6F4EE] flex items-center justify-center px-6">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <Link to="/" className="font-serif text-xl text-[#16233A]">Inkwell</Link>
                    <h1 className="font-serif text-2xl text-[#16233A] mt-6 mb-1">Welcome back</h1>
                    <p className="text-sm text-[#16233A]/60">Sign in to pick up where you left off</p>
                </div>

                <div className="bg-white rounded-2xl border border-[#16233A]/10 shadow-sm p-7">
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-xs font-medium text-[#16233A]/60 mb-1.5">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-3.5 py-2.5 rounded-lg border border-[#16233A]/15 text-sm text-[#16233A] placeholder:text-[#16233A]/30 focus:outline-none focus:ring-2 focus:ring-[#F2A93B]/50 focus:border-[#F2A93B] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-[#16233A]/60 mb-1.5">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-3.5 py-2.5 rounded-lg border border-[#16233A]/15 text-sm text-[#16233A] placeholder:text-[#16233A]/30 focus:outline-none focus:ring-2 focus:ring-[#F2A93B]/50 focus:border-[#F2A93B] transition-colors"
                            />
                        </div>

                        {authError && <p className="text-sm text-red-600 -mt-1">{authError}</p>}

                        <button
                            type="submit"
                            disabled={authLoading}
                            className="w-full py-2.5 rounded-lg bg-[#16233A] text-[#F6F4EE] text-sm font-medium hover:bg-[#0F1826] disabled:opacity-60 disabled:cursor-not-allowed transition-colors mt-1"
                        >
                            {authLoading ? 'Signing in…' : 'Sign in'}
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-5">
                        <div className="h-px bg-[#16233A]/10 flex-1" />
                        <span className="text-xs text-[#16233A]/40">or</span>
                        <div className="h-px bg-[#16233A]/10 flex-1" />
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        disabled={authLoading}
                        className="w-full py-2.5 rounded-lg border border-[#16233A]/15 text-sm font-medium text-[#16233A] hover:bg-[#16233A]/5 disabled:opacity-60 transition-colors"
                    >
                        Continue with Google
                    </button>
                </div>

                <p className="text-center text-sm text-[#16233A]/60 mt-6">
                    Don't have an account?{' '}
                    <Link to="/dashboard" className="text-[#16233A] font-medium underline underline-offset-2">
                        Get started from the dashboard
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
