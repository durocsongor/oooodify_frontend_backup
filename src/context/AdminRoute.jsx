// components/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function AdminRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <div>Betöltés...</div>; // spinner vagy loader

    if (!user) return <Navigate to="/" />; // nincs bejelentkezve

    if (user.role !== "admin") return <div>Nincs jogosultságod!</div>; // nem admin

    return children; // admin engedélyezve megy
}