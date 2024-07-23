import React, { useRef, useState } from 'react'
import cls from './OrdersTable.module.css'
import { Icon } from '@iconify/react/dist/iconify.js'
import OrderDetailModal from './components/OrderDetailModal/OrderDetailModal'

const OrdersTable = ({ orders, delivered }) => {
	const orderDetailModal = useRef(null)
	const [orderDetailId, setOrderDetailId] = useState()

	function handleSetDeail(id) {
		orderDetailModal.current.showModal()
		setOrderDetailId(id)
	}

	return (
		<>
			<table className={cls.table}>
				<thead>
					<tr>
						<th></th>
						<th className={cls.center}>ID</th>
						<th className={cls.center}>Статус</th>
						<th className={cls.center}>Дата выдачи</th>
						<th className={cls.center}>Телефон</th>
						<th className={cls.center}>Клиент</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order, index) => (
						<>
							<tr key={order.id}>
								<td className={cls.center}>{index + 1}</td>
								<td>{order.id}</td>
								<td>
									<div
										className={
											order.is_given_out
												? 'banner giveOut mx-auto'
												: delivered
												? 'banner delivered mx-auto'
												: 'banner onTheWay mx-auto'
										}
									>
										{order.is_given_out
											? 'Выдан'
											: delivered
											? 'Доставлен'
											: 'В пути'}
									</div>
								</td>
								<td className={cls.center}>01.01.2024</td>
								<td className={cls.center}>{order.customer_phone}</td>
								<td className={cls.center}>{order.customer_name}</td>
								<td
									className={cls.detailTd}
									onClick={() => handleSetDeail(order.id)}
								>
									<button>
										<Icon
											icon='material-symbols:info-outline'
											width='25px'
											height='25px'
										/>
									</button>
								</td>
							</tr>
						</>
					))}
				</tbody>
			</table>
			<OrderDetailModal
				ref={orderDetailModal}
				id={orderDetailId}
				setId={setOrderDetailId}
			/>
		</>
	)
}

export default OrdersTable
