import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Auth({ children }) {
    const navigate = useNavigate();
    useEffect(function() {
        const isAuthenticated = false; 
        if (!isAuthenticated) navigate('/login');
    }, [navigate]);

    return <>{children}</>;
}

export default Auth;
