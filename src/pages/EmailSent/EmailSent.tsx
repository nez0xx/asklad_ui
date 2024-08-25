import React from 'react'
import Button from '../../UI/Button/Button'
import { useNavigate } from 'react-router-dom'
import cls from './EmailSent.module.css'

const EmailSent = () => {
	const navigate = useNavigate()

	return (
		<div className={cls.container}>
			<h2 className={cls.header}>Письмо отправлено</h2>
			<p className={cls.message}>
				На указанный вами адрес отправлено письмо. Пожалуйста, проверьте
				почтовый ящик и следуйте инструкциям, чтобы сбросить пароль.
			</p>

			<Button onClick={() => navigate('/enter_email')}>Назад</Button>
		</div>
	)
}

export default EmailSent
