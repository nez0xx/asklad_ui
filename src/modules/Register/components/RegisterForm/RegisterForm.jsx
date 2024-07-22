import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { register } from '../../api/register'
import { Link } from 'react-router-dom'
import Input from '../../../../UI/Input/Input'
import Button from '../../../../UI/Button/Button'
import { Icon } from '@iconify/react/dist/iconify.js'

import cls from './RegisterForm.module.css'

const RegisterForm = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')

	const { mutate } = useMutation({
		mutationFn: register,
		onSuccess: (data) => {
			console.log(data)
		},
	})

	function handleRegister(e) {
		e.preventDefault()
		mutate({ email, password, name: username })
	}

	return (
		<form className={cls.form} onSubmit={handleRegister}>
			<div className={cls.title}>
				<div>
					<Link to='/'>
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
					Введите
					email
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
					id='Password'
					label='Пароль'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{/* <Input
					id='Password'
					label='Подтверждение пароля'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/> */}
				<Button>Register</Button>
			</div>

			<div className={cls.alreadySignedUpBlock}>
				<div>
					<div>Уже зарегистрировались?</div>
					<Link to='/'>Войти</Link>
				</div>
			</div>
		</form>
	)
}

export default RegisterForm
