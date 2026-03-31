import React from 'react'

const TopSection = () => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-wrap md:flex-nowrap w-full`}>
            <div className='w-full flex flex-col bg-card rounded-md shadow-md min-h-max p-4'>
                <span className='font-heading font-semibold text-xl  text-primary'>Total Anomalies</span>
                <span className='font-bold text-4xl mt-4 text-secondary items-end'>{12}</span>
            </div>
            <div className='w-full flex flex-col bg-card rounded-md shadow-md min-h-max p-4'>
                <span className='font-heading font-semibold text-xl text-accent '>Highlighted Anomalies</span>
                <span className='font-bold text-4xl mt-4 text-accent items-end'>{5}</span>
            </div>
            <div className='w-full flex flex-col bg-card rounded-md shadow-md min-h-max p-4'>
                <span className='font-heading font-semibold text-xl  text-green-400'>Procurement Count</span>
                <span className='font-bold text-4xl mt-4 text-green-700 items-end'>{15}</span>
            </div>
            <div className='w-full flex flex-col bg-card rounded-md shadow-md min-h-max p-4'>
                <span className='font-heading font-semibold text-xl  text-yellow-500    '>Pending Actions</span>
                <span className='font-bold text-4xl mt-4 text-yellow-500 items-end'>{3}</span>
            </div>
        </div>
    )
}

export default TopSection