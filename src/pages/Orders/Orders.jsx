import React from 'react'
// import OrdersTable from '../../modules/OrdersTable/OrdersTable'
import AllOrders from '../../modules/AllOrders/AllOrders'
import { Search } from './components/Search'
import cls from './Orders.module.css'

const Orders = () => {
	return (
		<section className={cls.section}>
			<h1 className={cls.title}>Заказы</h1>

			<Search />

			<AllOrders />
		</section>
	)
}

export default Orders
