import React from 'react'
import Input from '../../components/input'
import Button from '../../components/button'

const ForgotPasswordPage = () => {
  return (
    <div className='flex w-full h-full min-h-screen p-2 justify-center items-center bg-background '>
        <form action="" method="post" className='flex p-5 flex-col justify-center max-h-max items-center bg-card shadow-md rounded-md'>
            <div>
                <h2 className='text-xl font-bold text-primary mb-5'>Forgot Password</h2></div>
            <div className='w-full  font-body gap-2 flex flex-col px-2 relative '>
                <label htmlFor="email"  className='text-md font-semibold text-primary'>Email</label>
                <Input id="email" name="email" type="email" placeholder='Enter your email' />
            </div>
                <Button text="Reset Password" cls="bg-blue-500 text-white hover:bg-blue-600 rounded-md" boxcls="mt-4 w-full" onclick={() => console.log("Reset Password clicked")} /> 
        </form>
    </div>
  )
}

export default ForgotPasswordPage