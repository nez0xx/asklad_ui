import React, { useContext, useState, useEffect } from 'react'
import ProfileSideMenu from './components/ProfileSideMenu/ProfileSideMenu'
import { Outlet } from 'react-router-dom'
import Header from '@modules/Header/Header'
import { HamburgerContext } from '@modules/HamburgerProvider/HamburgerProvider'
import cls from './Profile.module.css'
import ResponsiveMenu from '@modules/ResponsiveMenu/ResponsiveMenu'

const Profile = () => {
	const { isOpen } = useContext(HamburgerContext)
	const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1200)

	useEffect(() => {
		const handleResize = () => {
			setIsMobileView(window.innerWidth <= 1200)
		}

		window.addEventListener('resize', handleResize)

		handleResize()

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<>
			<Header />
			<main className={cls.profile}>
				{isMobileView ? isOpen && <ResponsiveMenu /> : <ProfileSideMenu />}
				<Outlet />
			</main>
		</>
	)
}

export default Profile
