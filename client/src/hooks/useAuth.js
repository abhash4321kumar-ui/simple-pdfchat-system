import { useState, useCallback } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebase.config';
import {
    Getuserfnc, Loginfnc, Signupfnc, GoogleLoginfnc, GoogleSignupfnc,
    Logoutfnc, GetChatHistoryfnc,
} from '../apis/user.api';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import { useLoading } from '../context/LoadingContext';


export const useAuth = () => {
    const { setUser, setIsAuth, setIsUploaded } = useAuthContext();
    const { setChatMessages, setHeaderStatus } = useChatContext();
    const { setIsLoading } = useLoading();

    const [authError, setAuthError] = useState('');
    const [authLoading, setAuthLoading] = useState(false);


    const loadSession = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await Getuserfnc();
            const user = res.data.user;
            setUser(user);
            setIsAuth(true);

            if (user.hasUploadedPDF) {
                setIsUploaded(true);
                setHeaderStatus('Welcome back! Continuing your last session.');

                const historyRes = await GetChatHistoryfnc();
                const pastChats = historyRes.data.chats.map((chat) => ({
                    sender: chat.sender,
                    text: chat.text,
                }));

                setChatMessages(
                    pastChats.length > 0
                        ? pastChats
                        : [{ sender: 'ai', text: 'PDF loaded! Ask me anything about it.' }]
                );
            }
        } catch {
            setIsAuth(false);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, [setUser, setIsAuth, setIsUploaded, setChatMessages, setHeaderStatus, setIsLoading]);

    const login = useCallback(async (email, password) => {
        setAuthError('');
        setAuthLoading(true);
        try {
            await Loginfnc(email, password);
            await loadSession();
            return { success: true };
        } catch (error) {
            const msg = error.response?.data?.message || 'Login failed. Please try again.';
            setAuthError(msg);
            return { success: false, message: msg };
        } finally {
            setAuthLoading(false);
        }
    }, [loadSession]);

    const signup = useCallback(async (formData) => {
        setAuthError('');
        setAuthLoading(true);
        try {
            const res = await Signupfnc(formData);
            return { success: true, message: res.data.message };
        } catch (error) {
            const msg = error.response?.data?.message || 'Error signing up';
            setAuthError(msg);
            return { success: false, message: msg };
        } finally {
            setAuthLoading(false);
        }
    }, []);

    // mode: 'login' | 'signup' — same Google popup, different backend call after.
    const googleAuth = useCallback(async (mode = 'login') => {
        setAuthError('');
        setAuthLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const fbUser = result.user;

            if (mode === 'signup') {
                const res = await GoogleSignupfnc({
                    username: fbUser.displayName,
                    email: fbUser.email,
                });
                return { success: true, message: res.data.message };
            }

            await GoogleLoginfnc(fbUser.email);
            await loadSession();
            return { success: true };
        } catch (error) {
            const msg = error.response?.data?.message || 'Google authentication failed';
            setAuthError(msg);
            return { success: false, message: msg };
        } finally {
            setAuthLoading(false);
        }
    }, [loadSession]);

    const logout = useCallback(async () => {
        try {
            await Logoutfnc();
        } finally {
            setUser(null);
            setIsAuth(false);
            setIsUploaded(false);
            setChatMessages([]);
            setHeaderStatus('No PDF selected');
        }
    }, [setUser, setIsAuth, setIsUploaded, setChatMessages, setHeaderStatus]);

    return {
        authError, authLoading,
        loadSession, login, signup, googleAuth, logout,
    };
};
