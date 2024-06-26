import React from 'react'
import Breadcrumbs from '../../components/elements/Breadcrumb'
import { Outlet } from 'react-router-dom'

const Profile = () => {
  return (
    <div>
        <Breadcrumbs headline="Thông tin tài khoản"/>
        
        <div className='w-full min-h-screen'>
            <Outlet />
        </div>
    </div>
  )
}

export default Profile