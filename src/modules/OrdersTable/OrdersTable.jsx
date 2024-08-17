import React, { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import OrderDetailModal from './components/OrderDetailModal/OrderDetailModal'
import cls from './OrdersTable.module.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const OrdersTable = ({ orders }) => {
	const [isOpen, setOpen] = useState(false)
	const [orderDetailId, setOrderDetailId] = useState()
	const [isExpanded, setIsExpanded] = useState(true)

	console.log(isOpen)

	const handleSetDetail = (id) => {
		setOpen(true)
		setOrderDetailId(id)
	}

	const handleToggle = () => {
		setIsExpanded(!isExpanded)
	}

	const sortedOrders = orders?.sort((a, b) => {
		const dateA = a.issue_date ? new Date(a.issue_date) : new Date(0)
		const dateB = b.issue_date ? new Date(b.issue_date) : new Date(0)
		return dateB - dateA
	})

	return (
		<>
			<div className={cls.orders}>
				<h2
					className={`${cls.secondaryTitle} ${
						isExpanded ? cls.expandedTitle : ''
					}`}
					onClick={handleToggle}
				>
					<div>Индивидуальные заказы</div>
					<div
						className={`${cls.titleIcon} ${isExpanded ? '' : cls.expandedIcon}`}
					>
						<Icon
							icon='mdi:chevron-down'
							width='25px'
							height='25px'
							color='#1f1f1f'
						/>
					</div>
				</h2>

				<div
					className={`${cls.ordersCont} ${isExpanded ? cls.show : cls.hide}`}
				>
					<table className={cls.table}>
						<thead>
							<tr>
								<th></th>
								<th>ID</th>
								<th>Статус</th>
								<th>Дата выдачи</th>
								<th>Телефон</th>
								<th>Клиент</th>
							</tr>
						</thead>
						<tbody>
							{sortedOrders.map((order, index) => (
								<tr
									onClick={() => handleSetDetail(order.id)}
									key={order.id}
									className={cls.row}
								>
									<td>{index + 1}</td>
									<td>{order.id}</td>
									<td>
										<div
											className={
												order.is_given_out
													? 'banner delivered mx-auto'
													: 'banner onTheWay mx-auto'
											}
										>
											{order.is_given_out ? 'Выдан' : 'Не выдан'}
										</div>
									</td>
									<td>
										{order.issue_date
											? order.issue_date.split('-').reverse().join('.')
											: ''}
									</td>
									<td>{order.customer_phone}</td>
									<td>{order.customer_name}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			{isOpen && (
				<OrderDetailModal
					id={orderDetailId}
					setId={setOrderDetailId}
					setOpen={setOpen}
				/>
			)}
			<ToastContainer />
		</>
	)
}

export default OrdersTable
