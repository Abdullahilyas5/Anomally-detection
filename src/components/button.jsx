import React from 'react'

const button = ({ text , cls , boxcls , func}) => {
  return (
    <div  className={`${boxcls}`}>
      <button onClick={func} className={`${cls} px-4 py-2 w-full rounded-md`}>{text}</button>
    </div>
  )
}

export default button