import React from 'react'
import { useMutation } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { confirmEmail } from './api/confirmEmail'
import Button from '../../UI/Button/Button'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import cls from './ConfirmEmail.module.css'

const ConfirmEmail = () => {
	const { token } = useParams()
	const navigate = useNavigate()

	const { mutate, isLoading } = useMutation(() => confirmEmail(token), {
		onSuccess: () => {
			toast.success('Email подтвержден успешно', {
				autoClose: 1000,
			})
			navigate('/successful_registration')
		},
		onError: (error) => {
			toast.error(error?.response?.data?.detail || 'Неизвестная ошибка', {
				autoClose: 1000,
				toastId,
			})
		},
	})

	const handleConfirmEmail = () => {
		mutate()
	}
	return (
		<div className={cls.block}>
			<ToastContainer />
			<div>
				<h1 className={cls.title}>Подтвердите почту</h1>
				<div className={cls.button}>
					<Button onClick={handleConfirmEmail} disabled={isLoading}>
						{isLoading ? 'Подтверждение...' : 'Подтвердить'}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ConfirmEmail
