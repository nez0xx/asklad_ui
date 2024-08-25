import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { deleteEmployee } from '../../api/deleteEmployee'
import { Icon } from '@iconify/react/dist/iconify.js'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import cls from './Employee.module.css'

const Employee = ({ name, id }) => {
	const queryClient = useQueryClient()

	const { mutate } = useMutation(deleteEmployee, {
		onSuccess: () => {
			queryClient.invalidateQueries('employees')
			toast.success('Сотрудник успешно удален!', {
				autoClose: 1000,
			})
			setTimeout(() => {
				window.location.reload()
			}, 1200)
		},
		onError: (error) => {
			toast.error(error?.response?.data?.detail || 'Неизвестная ошибка', {
				autoClose: 1000,
			})
		},
	})

	const handleDelete = () => {
		mutate(id)
	}

	return (
		<>
			<div className={cls.employeeCont}>
				<div className={cls.employee}>
					<div className={cls.employeePhoto} />
					<p>{name}</p>
				</div>
				<button onClick={handleDelete} className={cls.deleteButton}>
					<Icon icon='ep:delete' width='25px' height='25px' />
				</button>
			</div>
			<ToastContainer />
		</>
	)
}

export default Employee
