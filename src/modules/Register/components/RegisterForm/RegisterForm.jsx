import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { register } from '../../api/register'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../../../UI/Input/Input'
import Button from '../../../../UI/Button/Button'
import { Icon } from '@iconify/react/dist/iconify.js'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import cls from './RegisterForm.module.css'

const RegisterForm = () => {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [username, setUsername] = useState('')
	const [error, setError] = useState('')

	const { mutate } = useMutation({
		mutationFn: register,
		onSuccess: (data) => {
			toast.success('Пользователь успешно создан', {
				autoClose: 500,
				onClose: navigate('/confirm_email_sent'),
			})
		},
		onError: (error) => {
			toast.error(error?.response?.data?.detail || 'Неизвестная ошибка', {
				autoClose: 1000,
			})
		},
	})

	function handleRegister(e) {
		e.preventDefault()
		if (password !== confirmPassword) {
			setError('Пароли не совпадают')
			return
		}
		setError('')
		mutate({ email, password, name: username })
	}

	return (
		<form className={cls.form} onSubmit={handleRegister}>
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
					<h2>Регистрация</h2>
				</div>
			</div>

			<div className={cls.inputs}>
				<Input
					id='email'
					label='Введите email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					id='name'
					label='Введите ФИО'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<Input
					id='password'
					label='Пароль'
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Input
					id='confirmPassword'
					label='Подтверждение пароля'
					type='password'
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				{error && <div className={cls.error}>{error}</div>}
				<Button type='submit'>Зарегистрироваться</Button>
			</div>

			<div className={cls.alreadySignedUpBlock}>
				<div>
					<div>Уже зарегистрировались?</div>
					<Link to='/login'>Войти</Link>
				</div>
			</div>
		</form>
	)
}

export default RegisterForm
