// context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { whoami, logout } from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // ← átnevezve users → user
    const [errorUser, setErrorUser] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
            try {
                const data = await whoami();

                if (data.error) {
                    setErrorUser(data.error);
                    setLoading(false);
                    return;
                }

                setUser(data);
                setLoading(false);
            } catch (err) {
                setErrorUser("Hiba a felhasználó betöltésekor.");
                setLoading(false);
            }
        }

        loadUser();
    }, []);

    async function onLogout() {
        try {
            const data = await logout();

            if (data.error) {
                setErrorUser(data.error);
                return;
            }

            setUser(null);
        } catch {
            setErrorUser("Hiba kijelentkezéskor.");
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, loading, errorUser, onLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}