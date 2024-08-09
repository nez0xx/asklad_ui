import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react/dist/iconify.js'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import { sendResetPassword } from './api/sendResetPassword'
import { useMutation } from 'react-query'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import cls from './ResetPasswordForm.module.css'

const ResetPasswordForm = ({ token }) => {
	const [password, setPassword] = React.useState('')
	const [confirmedPassword, setConfirmedPassword] = React.useState('')
	const navigate = useNavigate()

	const { mutate } = useMutation(sendResetPassword, {
		onSuccess: () => {
			toast.success('Сброс пароля успешен!', {
				autoClose: 500,
				onClose: () => navigate('/login'),
			})
		},
		onError: () => {
			toast.error('Сброс пароля не удался', {
				autoClose: 1000,
			})
		},
	})

	const handleFormSubmit = (e) => {
		e.preventDefault()
		if (password !== confirmedPassword) {
			toast.error('Пароли не совпадают', {
				autoClose: 1000,
			})
			return
		}

		mutate({ token, password })
	}

	return (
		<>
			<div className={cls.block}>
				<form className={cls.form} onSubmit={handleFormSubmit}>
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
							<h2>Сброс пароля</h2>
						</div>
					</div>

					<div className={cls.inputs}>
						<Input
							id='password'
							label='Новый пароль'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Input
							id='confirmedPassword'
							label='Подтверждение пароля'
							type='password'
							value={confirmedPassword}
							onChange={(e) => setConfirmedPassword(e.target.value)}
						/>
						<Button type='submit'>Продолжить</Button>
					</div>

					<div className={cls.resetLinkBlock}>
						<div>
							<div>Еще не зарегистрировались?</div>
							<Link to='/register'>Регистрация</Link>
						</div>
					</div>
				</form>
			</div>
			<ToastContainer />
		</>
	)
}

export default ResetPasswordForm
