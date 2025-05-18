import React, { createContext, useState, useEffect, type ReactNode } from 'react';

interface AuthContextType {
    token: string | null;
    role: string | null;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const decoded = JSON.parse(atob(storedToken.split('.')[1]));
            setRole(decoded.role);
        }
    }, [token]);

    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
        const decoded = JSON.parse(atob(newToken.split('.')[1]));
        setRole(decoded.role);
    };

    const logout = () => {
        setToken(null);
        setRole(null);
        localStorage.removeItem('token');
    };

    return <AuthContext.Provider value={{ token, role, login, logout }}>{children}</AuthContext.Provider>;
};