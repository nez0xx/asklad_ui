import React from 'react';
import cls from './ConsolidatedOrders.module.css';
import ConsolidatedOrdersTable from './components/ConsolidatedOrdersTable';

const ConsolidatedOrders = ({ data }) => {
	return (
		<div className={cls.ConsolidatedOrders}>
			<h2>Консолидированные заказы</h2>
			<hr />
			<ConsolidatedOrdersTable consolidatedOrders={data} />
		</div>
	);
};

export default ConsolidatedOrders;
