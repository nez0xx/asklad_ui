import React from 'react'
import { useMutation } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { confirmInviteEmployee } from './api/confirmInviteEmployee'
import { toast, ToastContainer } from 'react-toastify'
import Button from '../../UI/Button/Button'
import 'react-toastify/dist/ReactToastify.css'
import cls from './ConfirmEmployee.module.css'

const ConfirmEmployee = () => {
	const { token } = useParams()
	const navigate = useNavigate()

	const { mutate, isLoading } = useMutation(
		() => confirmInviteEmployee(token),
		{
			onSuccess: () => {
				toast.success('Подтверждение прошло успешно!', {
					autoClose: 1000,
				})
				navigate('/profile/warehouse')
			},
			onError: (error) => {
				toast.error(error?.response?.data?.detail || 'Неизвестная ошибка', {
					autoClose: 1000,
				})
			},
		}
	)

	const handleConfirmEmployee = () => {
		mutate()
	}

	return (
		<div className={cls.block}>
			<ToastContainer />
			<div>
				<h1 className={cls.title}>Вы присоединились к складу!</h1>
				<div className={cls.button}>
					<Button onClick={handleConfirmEmployee} disabled={isLoading}>
						{isLoading ? 'Подтверждение...' : 'Подтвердите почту'}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ConfirmEmployee
