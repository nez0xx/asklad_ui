import React, { useRef, useState } from 'react'
import AllOrdersDetail from './components/AllOrdersDetail/AllOrdersDetail'
import OrdersSearch from './components/OrdersSearch/OrdersSearch'
import { useQuery } from 'react-query'
import { getAllOrders } from './api/getAllOrders'

import cls from './AllOrders.module.css'

const AllOrders = () => {
	const allOrderDetailModal = useRef(null)
	const [orderDetailId, setOrderDetailId] = useState()
	const [searchValue, setSearchValue] = React.useState('')
	const [sortByGivenOut, setSortByGivenOut] = React.useState('')

	function handleSetDeail(id) {
		allOrderDetailModal.current.showModal()
		setOrderDetailId(id)
	}

	const { data } = useQuery(
		['all-orders', searchValue, sortByGivenOut],
		() => getAllOrders(searchValue, sortByGivenOut),
		{
			keepPreviousData: true,
		}
	)

	return (
		<>
			<OrdersSearch
				value={searchValue}
				setValue={setSearchValue}
				setSortByGivenOut={setSortByGivenOut}
			/>

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
					{data?.map((order, index) => (
						<tr
							className={cls.row}
							key={order.id}
							onClick={() => handleSetDeail(order.id)}
						>
							<td className={cls.center}>{index + 1}</td>
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
			<AllOrdersDetail
				id={orderDetailId}
				setId={setOrderDetailId}
				ref={allOrderDetailModal}
			/>
		</>
	)
}

export default AllOrders
