import React from 'react'
import Button from '../../components/button'
import Input from '../../components/input'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import axios from 'axios'

const LoginPage = () => {

    const [showsetpassword, setShowSetPassword] = React.useState(false);
    const [loging, setLoging] = React.useState(false);
    const passwordRef = useRef(null);

    const togglePasswordVisibility = () => {
        setShowSetPassword(prev => !prev);
    }

    const handleLogin = (e)=>{ 
        e.preventDefault();
        console.log("logged in..." , e)
    }

    return (
        <div className='w-full h-screen border border-accent bg-background'>
            <form method='Post' className='flex flex-col gap-4 w-full bg-card p-4 rounded-lg shadow-md justify-center align-center max-w-md mx-auto mt-10'>
                <h3 className='text-4xl text-primary font-bold text-center mb-10'>Login</h3>
                <div className='w-full font-body gap-2 flex flex-col px-2 '>
                    <label htmlFor="email" className='text-md font-semibold text-primary'>Email</label>
                    <Input id="email" name="email" type="email" placeholder='Email' />
                </div>
                <div className='w-full  font-body gap-2 flex flex-col px-2 relative '>

                    <div className='flex justify-between'>
                        <label htmlFor="password" className='text-md font-semibold text-primary'>Password</label>
                        <Link to="/forgotpassword" className="text-blue-500 hover:text-blue-600 text-xs flex items-end">Forgot Password?</Link>
                    </div>
                    <Input ref={passwordRef} cls={"relative"} id="password" name="password" type={showsetpassword ? "text" : "password"} placeholder='Password' />

                    {!showsetpassword ? (
                        <FaRegEye className='absolute right-5 top-11 opacity-40 cursor-pointer ' onClick={() => {
                            console.log("clicked");
                            togglePasswordVisibility()
                        }} />
                    ) : (
                        <FaRegEyeSlash className='absolute right-5 top-11 opacity-70 cursor-pointer ' onClick={() => {
                            console.log("clicked");
                            togglePasswordVisibility()
                        }} />
                    )}

                </div>
                <p className='mx-4 text-sm'>Register your account? <Link to={'/signup'} className='text-blue-500 hover:text-blue-600 text-sm'>Sign Up</Link></p>
                <Button text={loging ? "loggin.. " : "login"} cls="bg-blue-500 text-white hover:bg-blue-600 rounded-md" boxcls="mt-4" onClick={handleLogin} />
            </form>
        </div>
    )
}

export default LoginPage