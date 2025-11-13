import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthService } from '../services/auth.service';

interface AuthContextType {
    isAuthenticated: boolean | null;
    isLoading: boolean;
    logout: () => Promise<void>;
    updateAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: null,
    isLoading: true,
    logout: () => Promise.resolve(),
    updateAuthStatus: () => Promise.resolve(),
});

export function useAuthContext() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = async () => {
        const token = await AuthService.getAuthToken();

        setIsAuthenticated(!!token);
        setIsLoading(false);
    };

    const updateAuthStatus = async () => {
        setIsLoading(true);
        await checkAuth();
    }

    useEffect(() => { checkAuth() }, []);

    const logout = async () => {
        await AuthService.clearSession();
        setIsAuthenticated(false);
    };

    const value = { isAuthenticated, isLoading, logout, updateAuthStatus };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}