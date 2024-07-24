import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useStore } from '../../store/index'
import cls from './Header.module.css'

const Header = () => {
	const { user, isAuth } = useStore()

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
						Поддержка
					</a>
					{!isAuth && (
						<Link to='/profile/account' className={cls.userName}>
							<div className={cls.text}>User Name</div>
							<div className={cls.image}></div>
						</Link>
					)}
				</div>
			</div>
		</header>
	)
}

export default Header
