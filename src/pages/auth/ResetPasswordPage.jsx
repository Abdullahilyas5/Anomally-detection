import React from 'react'
import Input from '../../components/input'
import Button from '../../components/button'

const ResetPasswordPage = () => {
  return (
    <div className='flex h-screen w-screen justify-center bg-background '>
        <form action="" method="post" className='flex justify-center items-center bg-card shadow-md rounded-md'>
            <div>
                <label htmlFor="password" className='text-md font-semibold text-primary'>New Password</label>
                <Input id="password" name="password" type="password" placeholder='Enter new password' />
            </div>
            <div>
                <label htmlFor="confirm_password" className='text-md font-semibold text-primary'>Confirm Password</label>
                <Input id="confirm_password" name="confirm_password" type="password" placeholder='Confirm new password' />
            </div>
            <div>
                <Button text="Reset Password" cls="bg-blue-500 text-white hover:bg-blue-600 rounded-md" boxcls="mt-4" onclick={() => console.log("Reset Password clicked")} />
            </div>
        </form>
    </div>
  )
}

export default ResetPasswordPage