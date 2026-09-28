import { createContext, useContext, useState } from 'react';

/**
 * STATE LAYER
 * App-wide "is something big loading" flag — e.g. the initial session check
 * on Dashboard mount. Kept separate from per-form loading (like the login
 * button spinner), which stays local to its hook since nothing else needs it.
 */

const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const ctx = useContext(LoadingContext);
    if (!ctx) throw new Error('useLoading must be used within a LoadingProvider');
    return ctx;
};
