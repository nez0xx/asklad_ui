import React, { useState } from 'react'
import cls from './Select.module.css'

export const Select = ({
	options = [],
	selectedValue,
	onChange,
	handleSelectChange,
}) => {
	const [isOpen, setIsOpen] = useState(false)

	const handleSelect = (value) => {
		onChange(value)
		handleSelectChange(value)
		setIsOpen(false)
	}

	return (
		<div className={cls.container}>
			<div className={cls.header} onClick={() => setIsOpen(!isOpen)}>
				{options.find((option) => option.value === selectedValue)?.label ||
					'Select an option'}
				<span className={`${cls.arrow} ${isOpen ? cls.open : ''}`}>
					&#9660;
				</span>
			</div>
			{isOpen && (
				<div className={cls.dropdown}>
					{options.map((option) => (
						<div
							key={option.value}
							className={cls.option}
							onClick={() => handleSelect(option.value)}
						>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
