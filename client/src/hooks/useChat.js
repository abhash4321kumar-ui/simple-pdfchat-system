import { useState, useCallback } from 'react';
import { Uploadpdffnc, ChatWithPdffnc } from '../apis/user.api';
import { useChatContext } from '../context/ChatContext';
import { useAuthContext } from '../context/AuthContext';

/**
 * HOOK LAYER
 * Upload + chat API calls, error handling, and writing results into the
 * shared Chat/Auth state. Pages just call uploadPdf(file) / sendMessage(text).
 */
export const useChat = () => {
    const { chatMessages, addMessage, setChatMessages, headerStatus, setHeaderStatus } = useChatContext();
    const { setIsUploaded } = useAuthContext();

    const [isUploading, setIsUploading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [uploadError, setUploadError] = useState('');

    const uploadPdf = useCallback(async (file) => {
        if (!file) return;
        setUploadError('');
        setIsUploading(true);
        setHeaderStatus('Uploading and vectorizing your PDF…');

        const formData = new FormData();
        formData.append('pdf', file);

        try {
            await Uploadpdffnc(formData);
            setHeaderStatus('PDF ready — ask away.');
            setIsUploaded(true);
            setChatMessages([{ sender: 'ai', text: 'PDF loaded! Ask me anything about it.' }]);
        } catch (error) {
            const msg = error.response?.data?.message || 'Error uploading PDF';
            setUploadError(msg);
            setHeaderStatus('Upload failed — try again.');
        } finally {
            setIsUploading(false);
        }
    }, [setHeaderStatus, setIsUploaded, setChatMessages]);

    const sendMessage = useCallback(async (text) => {
        if (!text.trim()) return;
        addMessage({ sender: 'user', text });
        setIsTyping(true);

        try {
            const res = await ChatWithPdffnc(text);
            addMessage({ sender: 'ai', text: res.data.response });
        } catch (error) {
            if (error.response?.status === 429) {
                addMessage({ sender: 'ai', text: '⚠️ ' + error.response.data.message });
            } else {
                addMessage({ sender: 'ai', text: 'Sorry, I ran into an error. Please try again.' });
            }
        } finally {
            setIsTyping(false);
        }
    }, [addMessage]);

    return {
        chatMessages, headerStatus,
        isUploading, isTyping, uploadError,
        uploadPdf, sendMessage,
    };
};
