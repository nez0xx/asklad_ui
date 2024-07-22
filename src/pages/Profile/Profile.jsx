import React from 'react'
import ProfileSideMenu from './components/ProfileSideMenu/ProfileSideMenu'
import { Outlet } from 'react-router-dom'
import { Header } from '../../UI/Header/Header'

import cls from './Profile.module.css'
import { checkAuth } from './api/checkAuth'
import { useQuery } from 'react-query'

const Profile = () => {
	const {} = useQuery({
		queryKey: ['check-auth'],
		queryFn: checkAuth,
		onSuccess: (data) => {
			console.log(data)
		},
	})

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
