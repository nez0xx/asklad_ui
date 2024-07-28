import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../UI/Button/Button'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useMutation, useQueryClient } from 'react-query'
import { deleteConsolidatedOrder } from '../api/deleteConsolidatedOrder'
import { toast, ToastContainer } from 'react-toastify'
import cls from './ConsolidatedOrdersTable.module.css'

const containerId = 'consolidated-orders-table-toast-container'
const toastId = 'consolidated-orders-table-toast'

const ConsolidatedOrdersTable = ({ consolidatedOrders }) => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const { mutate, isLoading } = useMutation({
		mutationFn: deleteConsolidatedOrder,
		onSuccess: (data) => {
			console.log(data)
			toast.update(toastId, {
				render: 'Deleted successfully',
				isLoading: false,
				type: 'success',
				containerId,
				autoClose: 1000,
			})
			queryClient.invalidateQueries(['warehouse-consolidated-orders'])
		},
		onError: (data) => {
			console.log(data)
			toast.update(toastId, {
				render: 'Failed to delete',
				isLoading: false,
				type: 'error',
				containerId,
				autoClose: 1000,
			})
		},
	})

	function navigateToDetails(id) {
		navigate(`/profile/order/${id}`)
	}

	function handleDeleteConsilidatedOrder(id) {
		mutate(id)
	}

	if (isLoading) {
		toast('Deleting', {
			isLoading: true,
			containerId,
			toastId,
		})
	}

	React.useEffect(() => {
		console.log('Hello')
		const rows = document.querySelectorAll(`#consolidated-table-row`)
		rows.forEach((row) => {
			const tds = row.querySelectorAll(`.${cls.td}`)
			tds.forEach((td, index) => {
				if (index < tds.length) {
					td.addEventListener('mouseenter', () => {
						console.log('hellow')
						tds.forEach((innerTd, innerIndex) => {
							if (innerIndex < tds.length) {
								innerTd.classList.add(cls.tdHoverEffect)
							}
						})
					})
					td.addEventListener('mouseleave', () => {
						tds.forEach((innerTd, innerIndex) => {
							if (innerIndex < tds.length) {
								innerTd.classList.remove(cls.tdHoverEffect)
							}
						})
					})
				}
			})
		})
	}, [])

	return (
		<>
			<table className={cls.table}>
				<thead>
					<tr>
						<th></th>
						<th>ID</th>
						<th>Статус</th>
						<th>Дата доставки</th>
					</tr>
				</thead>
				<tbody>
					{consolidatedOrders?.map((order, index) => (
						<tr key={order.id} id='consolidated-table-row'>
							<td
								className={cls.td}
								onClick={() => navigateToDetails(order.id)}
							>
								{index + 1}
							</td>
							<td
								className={cls.td}
								onClick={() => navigateToDetails(order.id)}
							>
								{order.id}
							</td>
							<td
								className={cls.td}
								onClick={() => navigateToDetails(order.id)}
							>
								<div
									className={`${
										order.delivered
											? 'banner delivered mx-auto'
											: 'banner onTheWay mx-auto'
									} ${cls.td}`}
								>
									{order.delivered ? 'Доставлен' : 'В пути'}
								</div>
							</td>
							<td
								className={cls.td}
								onClick={() => navigateToDetails(order.id)}
							>
								{order.delivery_date}
							</td>
							<td className={cls.deleteTd}>
								<Button
									className={cls.dleteButton}
									onClick={() => handleDeleteConsilidatedOrder(order.id)}
								>
									<Icon icon='mi:delete' width='25px' height='25px' />
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<ToastContainer containerId={containerId} />
		</>
	)
}

export default ConsolidatedOrdersTable
