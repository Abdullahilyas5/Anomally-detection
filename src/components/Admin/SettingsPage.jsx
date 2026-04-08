import React from 'react'
import SideMenu from './SideMenu'
import ConfigurationMenu from './ConfigurationMenu'

const SettingsPage = () => {
  return (
    <div className='grid grid-cols-3'>
        <SideMenu className="space-x-1 "/>
        <ConfigurationMenu/>
    </div>
  )
}

export default SettingsPage