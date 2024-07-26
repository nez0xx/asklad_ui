import React from 'react'
import { useParams } from 'react-router-dom'
import ConsolidatedOrderInfo from '../../modules/ConsolidatedOrderInfo/ConsolidatedOrderInfo'
import cls from './OrdersOfConsolidatedOrder.module.css'

const OrdersOfConsolidatedOrder = ({ data }) => {
	const { id } = useParams()
	return (
		<section className={cls.section}>
			<h1 className={cls.title}>Консолидированный заказ - {id}</h1>

			<ConsolidatedOrderInfo />
		</section>
	)
}

export default OrdersOfConsolidatedOrder
