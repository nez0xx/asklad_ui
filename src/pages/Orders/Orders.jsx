import React from 'react'
// import OrdersTable from '../../modules/OrdersTable/OrdersTable'
import AllOrders from '../../modules/AllOrders/AllOrders'
import cls from './Orders.module.css'

const Orders = () => {
	return (
		<section className={cls.section}>
			<h1 className={cls.title}>Заказы</h1>

			<div className={cls.container}>
				<AllOrders />
			</div>
		</section>
	)
}

export default Orders
