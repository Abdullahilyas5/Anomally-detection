import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../../components/Dashboard';

const AdminPage = ({ role, children }) => {
    const { isAuthenticated, role: userRole, accessToken, loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const storedRole = userRole || localStorage.getItem("role");
    const token = accessToken || localStorage.getItem("accessToken");

    useEffect(() => {
        if (loading) return;

        if (!token || isAuthenticated === false) {
            navigate('/login', { replace: true });
            return;
        }

        if (storedRole && storedRole !== role) {
            navigate(`/${storedRole}/dashboard`, { replace: true });
        }
    }, [isAuthenticated, role, loading, navigate, storedRole, token]);
   
    if (loading || (isAuthenticated && !storedRole) || (!token && !loading)) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-background">
                <p className="text-gray-500 font-body">Loading secure session...</p>
            </div>
        );
    }

    return (
        <div className='w-full h-full min-h-screen font-body bg-background'>
            <Dashboard role={role}>
                {children}
            </Dashboard>
        </div>
    );
};

export default AdminPage;