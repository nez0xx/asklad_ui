import React from 'react'
import cls from './Checkbox.module.css'

const Checkbox = ({ checked, onChange }) => {
	return (
		<div className={cls.checkboxContainer} onClick={() => onChange(!checked)}>
			<input
				type='checkbox'
				className={cls.checkbox}
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
			/>
			<span className={`${cls.customCheckbox} ${checked ? cls.checked : ''}`} />
		</div>
	)
}

export default Checkbox
