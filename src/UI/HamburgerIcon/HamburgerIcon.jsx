import React, { useContext, useEffect } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { HamburgerContext } from '../../modules/HamburgerProvider/HamburgerProvider'
import cls from './HamburgerIcon.module.css'

const HamburgerIcon = () => {
	const { isOpen, toggleMenu } = useContext(HamburgerContext)

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}

		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	return (
		<button className={cls.hamburgerIcon} onClick={toggleMenu}>
			<Icon
				icon={isOpen ? 'mdi:close' : 'mdi:menu'}
				width='30px'
				height='30px'
			/>
		</button>
	)
}

export default HamburgerIcon
