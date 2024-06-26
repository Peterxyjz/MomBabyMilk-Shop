import React from 'react'
import Breadcrumbs from '../../components/elements/Breadcrumb'
import { Outlet } from 'react-router-dom'
import { SideBarProfile } from '../../components/profile/SideBarProfile'

const Profile = () => {
  return (
    <div>
        <Breadcrumbs headline="Thông tin tài khoản"/>
        <div className='w-full flex justify-center gap-4 my-4'>
            <div className='w-1/5'>
                <SideBarProfile/>
            </div>
            <div className='w-4/5'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Profile