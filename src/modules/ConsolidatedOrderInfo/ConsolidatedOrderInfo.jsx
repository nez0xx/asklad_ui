import React from 'react';
import OrdersTable from '../OrdersTable/OrdersTable';
import cls from './ConsolidatedOrderInfo.module.css';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getConsolidatedOrderOrders } from './api/getConsolidatedOrderOrders';

const ConsolidatedOrderInfo = () => {
	const { id } = useParams();
	const { data, isLoading } = useQuery({
		queryKey: ['consolodated-order-orders'],
		queryFn: () => getConsolidatedOrderOrders({ id }),
	});

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className={cls.ConsolidatedOrderInfo}>
			<h1>Консолидированный заказ - {id}</h1>
			<div className={cls.consolidatedOrderInfo}>
				<p>Склад: Мой cклад #1</p>
				<div className={cls.status}>
					<p>Статус:</p>{' '}
					<div
						className={
							data.delivered
								? 'banner delivered mx-auto'
								: 'banner onTheWay mx-auto'
						}>
						{data?.delivered ? 'Доставлен' : 'В пути'}
					</div>
				</div>
				<p>Дата доставки: {data.delivery_date}</p>
				<p>Принял: Фамилия Имя</p>
			</div>
			<h2>Индивидуальные заказы</h2>
			<OrdersTable orders={data.orders_relationship} delivered={data.delivered} />
		</div>
	);
};

export default ConsolidatedOrderInfo;
