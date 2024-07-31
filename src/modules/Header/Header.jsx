import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useQuery } from 'react-query'
import { getMe } from './api/getMe'
import cls from './Header.module.css'

const Header = () => {
	const { data, isLoading } = useQuery('getMe', getMe)
	const location = useLocation()

	return (
		<header className={cls.header}>
			<div className={cls.headerCont}>
				<div className={cls.logo}>А.Склад</div>
				<div className={cls.block}>
					<a href='https://t.me/askladsupbot'>
						<Icon
							icon='hugeicons:customer-support'
							width='25px'
							height='25px'
						/>
						Поддержкаd
					</a>
					{location.pathname !== '/login' &&
						location.pathname !== '/register' && (
							<Link to='/profile/account' className={cls.userName}>
								<div className={cls.text}>
									{!isLoading ? data.name : 'Loading...'}
								</div>
								<div className={cls.image}></div>
							</Link>
						)}
				</div>
			</div>
		</header>
	)
}

export default Header
