import React from 'react'
import Button from '../../components/button'
import Input from '../../components/input'
import { Link } from 'react-router-dom'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";


import { useRef } from 'react';
const SignupPage = () => {
    const [showsetpassword, setShowSetPassword] = React.useState(false);
    const passwordRef = useRef(null);

    const togglePasswordVisibility = () => {
        setShowSetPassword(prev => !prev);
    }

    return (
        <div className='w-full h-screen border border-accent bg-background '>
            <form method='Post' className='flex flex-col gap-4 w-full bg-card bg-opacity-100 p-4 rounded-lg shadow-md justify-center align-center max-w-md mx-auto mt-10'>
                <h3 className='text-4xl text-primary font-bold text-center mb-10'>Sign Up</h3>
                <div className='w-full font-body gap-2 flex flex-col px-2' >
                    <label htmlFor="username" className='text-md font-semibold text-primary' >UserName</label>
                    <Input id="username" name="username" type="text" cls={""}  placeholder='Username' />
                </div>
                <div className='w-full font-body gap-2 flex flex-col px-2 '>
                    <label htmlFor="email"  className='text-md font-semibold text-primary'>Email</label>
                    <Input id="email" name="email" type="email" placeholder='Email' />
                </div>
                <div className='w-full  font-body gap-2 flex flex-col px-2 relative '>
                    <label htmlFor="password"  className='text-md font-semibold text-primary'>Password</label>
                    <Input ref={passwordRef} cls={"relative"} id="password" name="password" type={showsetpassword ? "text" : "password"} placeholder='Password' />
                    
                    {!showsetpassword ? (
                        <FaRegEye className='absolute right-5 top-11 opacity-40 cursor-pointer ' onClick={() =>{
                            console.log("clicked");
                            togglePasswordVisibility()
                        } }/>
                    ) : (
                        <FaRegEyeSlash className='absolute right-5 top-11 opacity-70 cursor-pointer ' onClick={() =>{
                            console.log("clicked");
                            togglePasswordVisibility()
                        } }/>
                    )}
                
                </div>
                <div className='flex flex-col gap-1 justify-center'>
                    <p className='mx-4 text-sm'>If you already have an account? <Link to={'/login'} className='text-blue-500 hover:text-blue-600'>Login</Link></p>
                    <Button text="Sign Up" cls="bg-buttonBg text-white hover:bg-buttonHover rounded-md" boxcls="mt-4" onclick={() => console.log("Sign Up clicked")} />
                </div>
            </form>
        </div>
    )
}

export default SignupPage