import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthService } from '../services/auth.service';

interface AuthContextType {
    isAuthenticated: boolean | null;
    isLoading: boolean;
    logout: () => Promise<void>;
    updateAuthStatus: () => Promise<void>;
    isTokenExpired: boolean; 
    clearTokenExpiredFlag: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: null,
    isLoading: true,
    logout: () => Promise.resolve(),
    updateAuthStatus: () => Promise.resolve(),
    isTokenExpired: false,
    clearTokenExpiredFlag: () => null,
});

export function useAuthContext() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isTokenExpired, setIsTokenExpired] = useState(false);

    const logout = async (dueToExpiration = false) => { 
        await AuthService.clearSession();

        setIsAuthenticated(false);
        if (dueToExpiration) {
            setIsTokenExpired(true); 
        } else {
            setIsTokenExpired(false);
        }
    };

    const clearTokenExpiredFlag = () => { 
        setIsTokenExpired(false);
    };

    const checkAuth = async () => {
        const token = await AuthService.getAuthToken();

        setIsAuthenticated(!!token);
        setIsLoading(false);

        AuthService.setLogoutNotifier(() => logout(true));
    };

    const updateAuthStatus = async () => {
        setIsLoading(true);
        await checkAuth();
    }

    useEffect(() => { checkAuth() }, []);

    useEffect(() => {
        checkAuth();

        AuthService.setLogoutNotifier(logout);
    }, []);

    const value = { isAuthenticated, isLoading, logout, updateAuthStatus, isTokenExpired, clearTokenExpiredFlag };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}