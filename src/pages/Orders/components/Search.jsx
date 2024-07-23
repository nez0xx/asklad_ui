import React, { useRef } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import icon from './icon.svg'
import cls from './Search.module.css'

export const Search = () => {
	const inputRef = useRef(null)

	const handleIconClick = () => {
		inputRef.current.focus()
	}

	return (
		<div className={cls.searchBlock}>
			<div className={cls.input}>
				<input ref={inputRef} placeholder='Поиск по ID' type='text' />
				<div onClick={handleIconClick}>
					<Icon
						icon='material-symbols:search'
						width='22px'
						height='22px'
						color='white'
					/>
				</div>
			</div>

			<div className={cls.icon}>
				<img src={icon} alt='svg' />
			</div>
		</div>
	)
}
