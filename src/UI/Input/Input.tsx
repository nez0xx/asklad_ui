import React from 'react'
import cls from './Input.module.css'

const Input = ({ id, label, ...props }) => {
	return (
		<div className={cls.inputCont}>
			<input
				type='text'
				id={id}
				className={cls.input}
				placeholder=' '
				{...props}
			/>
			<label htmlFor={id} className={cls.label}>
				{label}
			</label>
		</div>
	)
}

export default Input
