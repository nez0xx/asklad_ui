import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import cls from './Header.module.css'

export const Header = () => {
	return (
		<header className={cls.header}>
			<div className={cls.headerCont}>
				<div className={cls.logo}>А.Склад</div>
				<div>
					<a href='https://t.me/askladsupbot'>
						<Icon
							icon='hugeicons:customer-support'
							width='25px'
							height='25px'
						/>
						Поддержка
					</a>
				</div>
			</div>
		</header>
	)
}
