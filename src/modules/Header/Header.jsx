import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useQuery } from 'react-query'
import { getMe } from './api/getMe'
import logo from './assets/logo.svg'
import user from './assets/user.jpg'
import cls from './Header.module.css'

const Header = () => {
	const { data, isLoading } = useQuery('getMe', getMe)
	const location = useLocation()

	return (
		<header className={cls.header}>
			<div className={cls.headerCont}>
				<div className={cls.logo}>
					<img src={logo} alt='logo' />
					<div>А.Склад</div>
				</div>
				<div className={cls.block}>
					<a href='https://t.me/askladsupbot'>
						<Icon
							icon='hugeicons:customer-support'
							width='25px'
							height='25px'
						/>
						Поддержка
					</a>
					{location.pathname !== '/login' &&
						location.pathname !== '/register' && (
							<Link to='/profile/account' className={cls.userName}>
								<div className={cls.text}>
									{!isLoading ? data.name : 'Loading...'}
								</div>
								<div className={cls.image}>
									<img src={user} alt='user' />
								</div>
							</Link>
						)}
				</div>
			</div>
		</header>
	)
}

export default Header
