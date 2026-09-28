import { LoadingProvider } from './LoadingContext';
import { AuthProvider } from './AuthContext';
import { ChatProvider } from './ChatContext';


const AppProviders = ({ children }) => (
    <LoadingProvider>
        <AuthProvider>
            <ChatProvider>
                {children}
            </ChatProvider>
        </AuthProvider>
    </LoadingProvider>
);

export default AppProviders;
