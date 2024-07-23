import React from 'react'
import { NavLink } from 'react-router-dom'
import cls from './ProfileSideMenu.module.css'

const ProfileSideMenu = () => {
	return (
		<aside className={cls.sideMenu}>
			<nav className={cls.navigation}>
				<ul className={cls.navList}>
					<li>
						<NavLink
							className={({ isActive }) => (isActive ? cls.active : '')}
							to={'orders'}
						>
							Заказы
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) => (isActive ? cls.active : '')}
							to={'warehouse'}
						>
							Склад
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) => (isActive ? cls.active : '')}
							to={'new_order'}
						>
							Добавить заказ
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) => (isActive ? cls.active : '')}
							to={'finance'}
						>
							Финансы
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) => (isActive ? cls.active : '')}
							to={'subscribes'}
						>
							Подписки
						</NavLink>
					</li>
					<li>
						<NavLink to={'/login'}>Выйти</NavLink>
					</li>
				</ul>
			</nav>
		</aside>
	)
}

export default ProfileSideMenu
