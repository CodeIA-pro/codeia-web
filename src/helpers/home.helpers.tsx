import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";

export const Redirection: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();

    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            if (user == null || user === undefined) {
                navigate('/login');
            } else if (user && user.repo_login) {
                navigate('/select-repo');
            } else {
                navigate('/connection');
            }
        }, 1200);

        return () => clearTimeout(redirectTimer);
    }, [user, navigate]);

    return null; // No renderiza nada
}
