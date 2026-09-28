import { createContext, useContext, useState } from 'react';

/**
 * STATE LAYER
 * Holds chat messages + status banner text. Shared between the hook that
 * fills it and the UI that renders it.
 */

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
    const [chatMessages, setChatMessages] = useState([]);
    const [headerStatus, setHeaderStatus] = useState('No PDF selected');

    const addMessage = (msg) => setChatMessages((prev) => [...prev, msg]);

    const value = {
        chatMessages, setChatMessages, addMessage,
        headerStatus, setHeaderStatus,
    };

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
    const ctx = useContext(ChatContext);
    if (!ctx) throw new Error('useChatContext must be used within a ChatProvider');
    return ctx;
};
