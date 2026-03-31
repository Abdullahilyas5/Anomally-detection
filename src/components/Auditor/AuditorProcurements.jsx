import React from 'react'
import Button from "../../components/button"

const AuditorProcurements = () => {
  return (
    <div>
      <div className='flex '>
        <h2>Procurements</h2>
        <div>
          <input type="text" placeholder="Search procurements..." />
          <Button text={Search} cls={`bg-primary text-white hover:bg-blue-600`} />
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default AuditorProcurements