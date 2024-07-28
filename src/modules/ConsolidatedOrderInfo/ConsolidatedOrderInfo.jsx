import React from 'react'
import OrdersTable from '../OrdersTable/OrdersTable'
import cls from './ConsolidatedOrderInfo.module.css'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import { getConsolidatedOrderOrders } from './api/getConsolidatedOrderOrders'
import { deliverConsolidatedOrder } from './api/deliverConsolidatedOrder'
import Button from '../../UI/Button/Button'

const ConsolidatedOrderInfo = () => {
	const { id } = useParams()
	const { data, isLoading } = useQuery({
		queryKey: ['consolodated-order-orders'],
		queryFn: () => getConsolidatedOrderOrders({ id }),
	})

	console.log(data)

	const { mutate, isLoading: isMutationLoading } = useMutation({
		mutationFn: () => deliverConsolidatedOrder({ united_order_id: id }),
	})

	const handleDeliverOrder = () => {
		mutate()
	}

	if (isLoading) {
		return <h1>Loading...</h1>
	}

	return (
		<div className={cls.block}>
			<div className={cls.container}>
				<div className={cls.info}>
					<p>Склад: Мой cклад #{data.warehouse_id}</p>
					<div className={cls.status}>
						<p>Статус:</p>{' '}
						<div
							className={
								data.delivered
									? 'banner delivered mx-auto'
									: 'banner onTheWay mx-auto'
							}
						>
							{data?.delivered ? 'Доставлен' : 'В пути'}
						</div>
					</div>
					<p>Дата доставки: {data.delivery_date}</p>
					<p>Принял: Фамилия Имя</p>
				</div>

				<div className={cls.button}>
					<Button onClick={handleDeliverOrder} disabled={isMutationLoading}>
						{isMutationLoading ? 'Loading...' : 'Доставить'}
					</Button>
				</div>
			</div>

			<OrdersTable
				orders={data.orders_relationship}
				delivered={data.delivered}
			/>
		</div>
	)
}

export default ConsolidatedOrderInfo
