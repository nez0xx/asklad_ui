import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react/dist/iconify.js'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import cls from './ResetPasswordForm.module.css'

const ResetPasswordForm = () => {
	const [password, setPassword] = React.useState('')
	const [confirmedPassword, setConfirmedPassword] = React.useState('')

	return (
		<form className={cls.form} onSubmit={() => console.log('Hello world')}>
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
					<h2>Сброс пароля</h2>
				</div>
			</div>

			<div className={cls.inputs}>
				<Input
					id='password'
					label='Новый пароль'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Input
					id='password'
					label='Подтверждение пароля'
					value={confirmedPassword}
					onChange={(e) => setConfirmedPassword(e.target.value)}
				/>
				<Button>Продолжить</Button>
			</div>

			<div className={cls.resetLinkBlock}>
				<div>
					<div>Еще не зарегистрировались?  </div>
					<Link to='/register'>Регистрация</Link>
				</div>
			</div>
		</form>
	)
}

export default ResetPasswordForm
