import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { HamburgerContext } from '../../modules/HamburgerProvider/HamburgerProvider'
import home from './assets/home.svg'
import orders from './assets/orders.svg'
import finance from './assets/finance.svg'
import give_out from './assets/give_out.svg'
import cls from './ResponsiveMenu.module.css'

const ResponsiveMenu = () => {
	const { toggleMenu } = useContext(HamburgerContext)

	return (
		<aside className={cls.sideMenu}>
			<nav className={cls.navigation}>
				<ul className={cls.navList}>
					<li>
						<NavLink
							className={({ isActive }) => (isActive ? cls.active : '')}
							onClick={() => toggleMenu()}
							to={'orders'}
						>
							<img src={orders} alt='orders' />
							<div>Заказы</div>
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) => (isActive ? cls.active : '')}
							onClick={() => toggleMenu()}
							to={'warehouse'}
						>
							<img src={home} alt='home' />
							<div>Склад</div>
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) => (isActive ? cls.active : '')}
							onClick={() => toggleMenu()}
							to={'files'}
						>
							<img src={give_out} alt='give_out' />
							<div>Файлы</div>
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) => (isActive ? cls.active : '')}
							onClick={() => toggleMenu()}
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
								toggleMenu()
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

export default ResponsiveMenu
