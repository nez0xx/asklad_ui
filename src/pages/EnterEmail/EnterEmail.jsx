import React, { useState } from 'react'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import { useMutation } from 'react-query'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Link, useNavigate } from 'react-router-dom'
import { createResetPasswordRequest } from './api/createResetPasswordRequest'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import cls from './EnterEmail.module.css'

const EnterEmail = () => {
	const [email, setEmail] = useState('')
	const navigate = useNavigate()

	const { mutate, isLoading } = useMutation(createResetPasswordRequest, {
		onSuccess: () => {
			toast.success('Письмо успешно отправлено!', {
				autoClose: 500,
				onClose: () => navigate('/email_sent'),
			})
		},
		onError: (err) => {
			toast.error(err?.response?.data?.detail || 'Неизвестная ошибка', {
				autoClose: 1000,
			})
		},
	})

	const isValidEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}

	const sentResetPasswordRequest = (e) => {
		e.preventDefault()
		if (!email || !isValidEmail(email)) {
			toast.error('Введите правильный email', {
				autoClose: 1000,
			})
			return
		}
		mutate(email)
	}

	return (
		<>
			<div className={cls.block}>
				<form className={cls.form} onSubmit={sentResetPasswordRequest}>
					<div className={cls.title}>
						<div>
							<Link to='/login'>
								<Icon
									icon='mdi:chevron-left'
									width='25px'
									height='25px'
									color='#000464'
								/>
							</Link>
							<h2>Введите email</h2>
						</div>
					</div>

					<div className={cls.inputs}>
						<Input
							id='email'
							label='Введите email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Button type='submit' disabled={isLoading}>
							{isLoading ? 'Sending...' : 'Продолжить'}
						</Button>
					</div>
				</form>
			</div>
			<ToastContainer />
		</>
	)
}

export default EnterEmail
