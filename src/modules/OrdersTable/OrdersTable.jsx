import React, { useRef, useState } from 'react'
import cls from './OrdersTable.module.css'
import { Icon } from '@iconify/react/dist/iconify.js'
import OrderDetailModal from './components/OrderDetailModal/OrderDetailModal'

const OrdersTable = ({ orders, delivered }) => {
	const orderDetailModal = useRef(null)
	const [orderDetailId, setOrderDetailId] = useState()
	const [isExpanded, setIsExpanded] = useState(true)

	function handleSetDeail(id) {
		orderDetailModal.current.showModal()
		setOrderDetailId(id)
	}

	const handleToggle = () => {
		setIsExpanded(!isExpanded)
	}

	console.log(orders)

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
							{orders.map((order, index) => (
								<tr key={order.id}>
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
											{order.is_given_out ? 'Выдан' : 'В пути'}
										</div>
									</td>
									<td>01.01.2024</td>
									<td>{order.customer_phone}</td>
									<td>{order.customer_name}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<OrderDetailModal
				ref={orderDetailModal}
				id={orderDetailId}
				setId={setOrderDetailId}
			/>
		</>
	)
}

export default OrdersTable
