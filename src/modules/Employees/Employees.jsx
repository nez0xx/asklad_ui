import React, { useState } from 'react'
import Employee from './components/Employee/Employee'
import EnterEmployeeEmail from './components/EnterEmployeeEmail/EnterEmployeeEmail'
import Button from '../../UI/Button/Button'
import { Icon } from '@iconify/react/dist/iconify.js'
import cls from './Employees.module.css'

const Employees = ({ data }) => {
	const [isExpanded, setIsExpanded] = useState(true)
	const [isPopupOpen, setPopupOpen] = useState(false)
	const [email, setEmail] = useState('')

	const handleToggle = () => {
		setIsExpanded(!isExpanded)
	}

	const openPopup = () => {
		setPopupOpen(true)
	}

	const closePopup = () => {
		setPopupOpen(false)
		setEmail('')
	}

	console.log(data, 'employees')

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
					<Employee
						key={employee?.employee_relationship?.id}
						id={employee?.employee_relationship?.id}
						name={employee?.employee_relationship?.name}
					/>
				))}

				<Button onClick={openPopup}>Добавить сотрудника</Button>
			</div>

			<EnterEmployeeEmail
				email={email}
				setEmail={setEmail}
				isOpen={isPopupOpen}
				onClose={closePopup}
			/>
		</div>
	)
}

export default Employees
