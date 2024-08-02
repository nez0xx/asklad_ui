import React from 'react'
import Button from '../../UI/Button/Button'
import { useNavigate } from 'react-router-dom'
import cls from './RegistrationEmailSent.module.css'

const RegistrationEmailSent = () => {
	const navigate = useNavigate()

	return (
		<div className={cls.container}>
			<h2 className={cls.header}>Письмо отправлено</h2>
			<p className={cls.message}>
				На указанный вами адрес отправлено письмо. Пожалуйста, проверьте
				почтовый ящик и следуйте инструкциям, чтобы подтвердить регистрацию.
			</p>

			<Button onClick={() => navigate('/register')}>Назад</Button>
		</div>
	)
}

export default RegistrationEmailSent
