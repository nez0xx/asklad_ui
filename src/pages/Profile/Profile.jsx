import React from 'react'
import ProfileSideMenu from './components/ProfileSideMenu/ProfileSideMenu'
import { Outlet } from 'react-router-dom'
import Header from '../../modules/Header/Header'

import cls from './Profile.module.css'

const Profile = () => {
	return (
		<>
			<Header />
			<main className={cls.profile}>
				<ProfileSideMenu />
				<Outlet />
			</main>
		</>
	)
}

export default Profile
