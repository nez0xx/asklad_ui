import React, { useEffect, useRef, useState } from 'react'
import { useMutation } from 'react-query'
import EmployeeInput from '../EmployeeInput/EmployeeInput'
import { addEmployee } from '../../api/addEmployee'
import Button from '../../../../UI/Button/Button'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import cls from './EnterEmployeeEmail.module.css'

const EnterEmployeeEmail = ({ isOpen, onClose, email, setEmail }) => {
	const popupRef = useRef(null)

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (popupRef.current && !popupRef.current.contains(event.target)) {
				onClose()
			}
		}

		const disableScroll = () => {
			document.body.style.overflow = 'hidden'
		}

		const enableScroll = () => {
			document.body.style.overflow = ''
		}

		if (isOpen) {
			disableScroll()
		} else {
			enableScroll()
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			enableScroll()
		}
	}, [isOpen, onClose])

	const { mutate } = useMutation(addEmployee, {
		onSuccess: () => {
			onClose()
			toast.success('Запрос отправлен на почту!', { autoClose: 1000 })
		},
		onError: (error) => {
			onClose()
			toast.error(error?.response?.data?.detail || 'Неизвестная ошибка', {
				autoClose: 1000,
			})
		},
	})

	const handleEmailChange = (event) => {
		setEmail(event.target.value)
	}

	const sendAddEmployeeRequest = () => {
		mutate(email)
	}

	if (!isOpen) return null

	return (
		<>
			<div className={cls.overlay}>
				<div className={cls.popup} ref={popupRef}>
					<button className={cls.closeButton} onClick={onClose}>
						&times;
					</button>
					<h2>Введите email сотрудника</h2>
					<div className={cls.inputBox}>
						<EmployeeInput
							id='employeeEmail'
							label='Email'
							value={email}
							onChange={handleEmailChange}
						/>
					</div>
					<div className={cls.buttonBox}>
						<Button onClick={sendAddEmployeeRequest}>
							Отправить приглашение
						</Button>
					</div>
				</div>
			</div>
			<ToastContainer />
		</>
	)
}

export default EnterEmployeeEmail
