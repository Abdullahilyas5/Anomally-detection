import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Dashboard from '../../components/Dashboard';

const AdminPage = ({role , children}) => {
    const authState = useSelector((state) => state.auth);

    const navigate = useNavigate();


    useEffect(() => {
        if (authState.isAuthenticated === false) {
            navigate('/login');
        } else if (authState.role !== role) {
            navigate(`/${authState.role}/dashboard`);
        }
    }, [authState.isAuthenticated, authState.role, role, navigate]);
   

  return (
    <div className='w-full h-full min-h-screen font-body bg-background'>
        <Dashboard role={role} children={children}/>
    </div>
  )
}

export default AdminPage