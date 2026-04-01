import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Dashboard from '../../components/Dashboard';

const CitizenPage = ({role , children}) => {
    const authState = useSelector((state) => state.auth);

    const navigate = useNavigate();


    // ⭕ implement when auth implemented 

    // useEffect(()=>{
    //     if(authState.isAuthenticated === false){
    //         navigate('/signup');
    //     }else if(authState.role !== 'admin'){
    //         navigate(`/${authState.role}`);
    //     }
    // })
   

  return (
    <div className='w-full h-full min-h-screen font-body bg-background'>
        <Dashboard role={role} children={children}/>
    </div>
  )
}

export default CitizenPage