import { createContext, useEffect, useState, ReactNode } from 'react';

interface DarkModeContextProps {
    darkMode: boolean;
    toggle: () => void;
}

interface DarkModeContextProviderProps {
    children: ReactNode;
}

const DarkModeContext = createContext<DarkModeContextProps>({
    darkMode: false,
    toggle: () => {},
});

function DarkModeContextProvider({ children }: DarkModeContextProviderProps) {
    const darkModeLocal = localStorage.getItem('darkMode') || 'false';
    const [darkMode, setDarkMode] = useState<boolean>(JSON.parse(darkModeLocal));

    useEffect(() => {
        if (darkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [darkMode]);

    const toggle = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    return <DarkModeContext.Provider value={{ darkMode, toggle }}>{children}</DarkModeContext.Provider>;
}

export { DarkModeContext, DarkModeContextProvider };
