import { useState } from 'react'
import Button from '../../../../UI/Button/Button'
import Input from '../../../../UI/Input/Input'
import { Icon } from '@iconify/react/dist/iconify.js'

import cls from './LoginForm.module.css'
import { useMutation } from 'react-query'
import { login } from '../../api/login'
import { Link, useNavigate } from 'react-router-dom'

const LoginForm = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const { mutate } = useMutation({
		mutationFn: login,
		onSuccess: (result) => {
			localStorage.setItem('token', result.data.access_token)
			navigate('/profile/orders')
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
					id='Password'
					label='Пароль'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button>Продолжить</Button>
			</div>

			<div className={cls.resetLinkBlock}>
				<div>
					<div>Забыли пароль? </div>
					<Link to='/reset-password'>Восстановить пароль</Link>
				</div>
			</div>
		</form>
	)
}

export default LoginForm
