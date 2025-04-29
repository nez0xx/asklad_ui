import React, { useEffect, useState } from 'react'
import AllOrdersDetail from './components/AllOrdersDetail/AllOrdersDetail'
import OrdersSearch from './components/OrdersSearch/OrdersSearch'
import { useQuery } from 'react-query'
import { getAllOrders } from './api/getAllOrders'
import cls from './AllOrders.module.css'
import { getAllOrdersPage } from './api/getAllOrdersPage'
import useAllOrdersStore from '@/store/allOrdersStore'
import Pagination from '@/UI/Pagination/Pagination'

function AllOrders () {
	const [isOpen, setOpen] = useState(false)
	const [orderDetailId, setOrderDetailId] = useState(null)
	const [searchNumberValue, setSearchNumberValue] = useState('')
	const [searchNameValue, setSearchNameValue] = useState('')
	const [selectedValue, setSelectedValue] = useState('all') // all | givenOut | notGivenOut
	const setData = useAllOrdersStore(state => state.setData)
	const page = useAllOrdersStore(state => state.data)
	const currentPage = useAllOrdersStore(state => state.currentPage)
	const nextPage = useAllOrdersStore(state => state.nextPage)
	const previousPage = useAllOrdersStore(state => state.previousPage)
	const setPage = useAllOrdersStore(state => state.setPage)
	const totalPages = useAllOrdersStore(state => state.totalPages)
	const size = useAllOrdersStore(state => state.size)

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

	const isSearching = searchNameValue || searchNumberValue;

	const queryKey = isSearching
	  ? ['all-orders', searchNumberValue, selectedValue, searchNameValue, currentPage]
	  : ['all-orders', currentPage, size];
	
	const queryFn = () => isSearching
	  ? getAllOrders(searchNumberValue, selectedValue, searchNameValue, currentPage, size)
	  : getAllOrdersPage(currentPage, size);
	
	const { data } = useQuery({
		queryKey, queryFn,
		refetchOnWindowFocus: false,
        retry: false
	});
	
	useEffect(() => {
	  if (data) {
		setData(data.orders, data.count);
	  }
	}, [data]);

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
						{page?.map((order, index) => (
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
			{page.length /*&& !searchNameValue && !searchNumberValue*/ ? <Pagination setPage={setPage} currentPage={currentPage} nextPage={nextPage} previousPage={previousPage} totalPages={totalPages}/> : ''}
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
