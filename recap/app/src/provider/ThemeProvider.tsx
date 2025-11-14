import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { THEMES } from '../../../constants/colors';

type ThemeKey = keyof typeof THEMES;
type CustomThemeType = typeof THEMES['dark'];

interface ThemeContextType {
    theme: CustomThemeType; 
    currentThemeKey: ThemeKey; 
    toggleTheme: () => void; 
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeContext() {
    const context = useContext(ThemeContext);
    
    if (context === undefined) {
        throw new Error('Escolha um tema existente.');
    }
    
    return context;
}

export function CustomThemeProvider({ children }: { children: ReactNode }) {
    const [currentThemeKey, setCurrentThemeKey] = useState<ThemeKey>('dark');

    const toggleTheme = () => {
        setCurrentThemeKey(prevKey => (prevKey === 'dark' ? 'light' : 'dark'));
    };

    const theme = useMemo(() => {
        return THEMES[currentThemeKey];
    }, [currentThemeKey]);

    const value: ThemeContextType = {
        theme,
        currentThemeKey,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}