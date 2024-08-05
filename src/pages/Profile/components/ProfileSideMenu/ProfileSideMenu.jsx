import React from 'react'
import { NavLink } from 'react-router-dom'
import home from '../../assets/home.svg'
import orders from '../../assets/orders.svg'
import finance from '../../assets/finance.svg'
import give_out from '../../assets/give_out.svg'
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
							<img src={orders} alt='orders' />
							<div>Заказы</div>
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) => (isActive ? cls.active : '')}
							to={'warehouse'}
						>
							<img src={home} alt='home' />
							<div>Склад</div>
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) => (isActive ? cls.active : '')}
							to={'files'}
						>
							<img src={give_out} alt='give_out' />
							<div>Файлы</div>
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) => (isActive ? cls.active : '')}
							to={'finance'}
						>
							<img src={finance} alt='finance' />
							<div>Финансы</div>
						</NavLink>
					</li>
					<li>
						<NavLink
							onClick={() => {
								localStorage.clear()
							}}
							to={'/login'}
						>
							Выйти
						</NavLink>
					</li>
				</ul>
			</nav>
		</aside>
	)
}

export default ProfileSideMenu
