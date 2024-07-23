import React, { useState } from 'react'
import Employee from './components/Employee/Employee'

import cls from './Employees.module.css'
import { Icon } from '@iconify/react/dist/iconify.js'

const Employees = ({ data }) => {
	const [isExpanded, setIsExpanded] = useState(true)

	const handleToggle = () => {
		setIsExpanded(!isExpanded)
	}

	return (
		<div className={cls.Employees}>
			<h2
				className={`${cls.secondaryTitle} ${
					isExpanded ? cls.expandedTitle : ''
				}`}
				onClick={handleToggle}
			>
				<div>Сотрудники</div>
				<div
					className={`${cls.titleIcon} ${!isExpanded ? cls.expandedIcon : ''}`}
				>
					<Icon
						icon='mdi:chevron-down'
						width='25px'
						height='25px'
						color='#1f1f1f'
					/>
				</div>
			</h2>

			<div
				className={`${cls.employeesCont} ${isExpanded ? cls.show : cls.hide}`}
			>
				{data?.map((employee) => (
					<Employee key={employee.id} name={employee?.employee?.name} />
				))}

				<button className={cls.addButton}>Добавить сотрудника</button>
			</div>
		</div>
	)
}

export default Employees
