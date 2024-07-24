import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import cls from './Header.module.css'
import { useStore } from '../../store/index'

export const Header = () => {
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
					{isAuth && (
						<div className={cls.userName}>
							<div className={cls.text}>User Name</div>
							<div className={cls.image}></div>
						</div>
					)}
				</div>
			</div>
		</header>
	)
}
