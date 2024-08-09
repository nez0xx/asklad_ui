import React, { useState } from 'react'
import AllOrdersDetail from './components/AllOrdersDetail/AllOrdersDetail'
import OrdersSearch from './components/OrdersSearch/OrdersSearch'
import { useQuery } from 'react-query'
import { getAllOrders } from './api/getAllOrders'
import cls from './AllOrders.module.css'

const AllOrders = () => {
	const [isOpen, setOpen] = React.useState(false)
	const [orderDetailId, setOrderDetailId] = useState(null)
	const [searchNumberValue, setSearchNumberValue] = useState('')
	const [searchNameValue, setSearchNameValue] = useState('')
	const [selectedValue, setSelectedValue] = useState('all') // all | givenOut | notGivenOut

	const handleSelectChange = (value) => {
		setSelectedValue(value)
	}

	const options = [
		{ value: 'all', label: 'Все заказы' },
		{ value: 'givenOut', label: 'Выданные' },
		{ value: 'notGivenOut', label: 'Не выданные' },
	]

	const handleSetDetail = (id) => {
		setOrderDetailId(id)
		setOpen(true)
	}

	console.log(orderDetailId)

	const { data } = useQuery(
		['all-orders', searchNumberValue, selectedValue, searchNameValue],
		() => getAllOrders(searchNumberValue, selectedValue, searchNameValue),
		{
			keepPreviousData: true,
		}
	)

	return (
		<>
			<OrdersSearch
				searchNumberValue={searchNumberValue}
				setSearchNumberValue={setSearchNumberValue}
				searchNameValue={searchNameValue}
				setSearchNameValue={setSearchNameValue}
				selectedValue={selectedValue}
				setSelectedValue={setSelectedValue}
				handleSelectChange={handleSelectChange}
				options={options}
			/>

			<div className={cls.table_container}>
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
								onClick={() => handleSetDetail(order.id)}
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

			{isOpen && (
				<AllOrdersDetail
					id={orderDetailId}
					setId={setOrderDetailId}
					setOpen={setOpen}
				/>
			)}
		</>
	)
}

export default AllOrders
