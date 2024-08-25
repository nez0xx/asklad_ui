import React from 'react'
import cls from './EmployeeInput.module.css'

const EmployeeInput = ({ id, label, value, onChange, ...props }) => {
	return (
		<div className={cls.inputCont}>
			<input
				type='text'
				id={id}
				className={cls.input}
				placeholder=' '
				value={value}
				onChange={onChange}
				{...props}
			/>
			<label htmlFor={id} className={cls.label}>
				{label}
			</label>
		</div>
	)
}

export default EmployeeInput
