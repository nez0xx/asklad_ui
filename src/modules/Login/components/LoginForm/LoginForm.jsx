import { useState } from 'react'
import Button from '../../../../UI/Button/Button'
import Input from '../../../../UI/Input/Input'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useMutation } from 'react-query'
import { login } from '../../api/login'
import { getMe } from '../../api/getMe'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import cls from './LoginForm.module.css'

const LoginForm = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const { mutate } = useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			localStorage.setItem('token', data.access_token)

			getMe()
				.then((res) => {
					localStorage.setItem('user', JSON.stringify(res))
				})
				.then(() => {
					navigate('/profile/orders')
				})
		},
		onError: (error) => {
			toast.error(error?.response?.data?.detail || 'Ошибка входа', {
				autoClose: 1000,
			})
		},
	})

	function handleLogin(e) {
		e.preventDefault()
		mutate({ email, password })
	}

	return (
		<form className={cls.form} onSubmit={handleLogin}>
			<div className={cls.title}>
				<div>
					<Link to='/register'>
						<Icon
							icon='mdi:chevron-left'
							width='25px'
							height='25px'
							color='#000464'
						/>
					</Link>
					<h2>Вход в аккаунт</h2>
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
					id='password'
					type='password'
					label='Пароль'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button>Войти</Button>
			</div>

			<div className={cls.resetLinkBlock}>
				<div>
					<div>Забыли пароль? </div>
					<Link to='/enter_email'>Восстановить пароль</Link>
				</div>
			</div>
		</form>
	)
}

export default LoginForm
