import React from 'react';
import OrdersTable from '../../modules/OrdersTable/OrdersTable';
import AllOrders from '../../modules/AllOrders/AllOrders';

const Orders = () => {
	return (
		<section className='wrapper'>
			<h1>Orders</h1>
			<AllOrders />
		</section>
	);
};

export default Orders;
