import React from 'react'
import { useNavigate } from 'react-router-dom';


export const Card = ({title , description , icons}) => {

    const navigate = useNavigate();

    const handleClick = () => {
        if(title === "Admin"){
            navigate('/admin');
        }   
        else if(title === "Editor"){
            navigate('/editor');
        }
        else if(title === "Citizen"){
            navigate('/citizen');
        }
    }

  return (
    <div className='bg-card shadow-md rounded-lg p-4 min-w-full w-64 max-w-xl hover:scale-105 transition-transform cursor-pointer h-max duration-500' onClick={handleClick}>
        
        <div className='flex justify-between '>
        <h2 className='text-2xl font-semibold font-body text-primary'>{title}</h2>
        <div>{icons}</div>
        </div>
        <p className='text-gray-600'>{description}</p>
        
    </div>
  )
}
