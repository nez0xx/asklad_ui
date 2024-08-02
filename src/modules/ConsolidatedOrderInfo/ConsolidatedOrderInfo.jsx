import React from 'react'
import OrdersTable from '../OrdersTable/OrdersTable'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import { getConsolidatedOrderOrders } from './api/getConsolidatedOrderOrders'
import { deliverConsolidatedOrder } from './api/deliverConsolidatedOrder'
import Button from '../../UI/Button/Button'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import cls from './ConsolidatedOrderInfo.module.css'

const ConsolidatedOrderInfo = () => {
	const { id } = useParams()

	const { data, isLoading } = useQuery({
		queryKey: ['consolidated-order-orders', id],
		queryFn: () => getConsolidatedOrderOrders({ id }),
	})

	const { mutate, isLoading: isMutationLoading } = useMutation({
		mutationFn: () => deliverConsolidatedOrder({ united_order_id: id }),
		onSuccess: () => {
			toast.success('Заказ доставлен успешно!', {
				autoClose: 1000,
				toastId: id,
			})
		},
		onError: (error) => {
			if (!toast.isActive(id)) {
				toast.error(error?.response?.data?.detail || 'Ошибка доставки заказа', {
					autoClose: 1000,
					toastId: id,
				})
			}
		},
	})

	const convertDate = (date) => {
		return date.split('-').reverse().join('.')
	}

	const handleDeliverOrder = () => {
		mutate()
	}

	if (isLoading) {
		return <h1>Loading...</h1>
	}

	if (!data) {
		return <h1>Заказ не найден</h1>
	}

	return (
		<>
			<div className={cls.block}>
				<div className={cls.container}>
					<div className={cls.info}>
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
						{data?.delivered && (
							<>
								<p>
									Дата доставки:{' '}
									{data?.delivery_date
										? convertDate(data?.delivery_date)
										: 'Неизвестная дата'}
								</p>
								<p>
									Принял:{' '}
									{data?.employee_relationship?.name || 'Неизвестный сотрудник'}
								</p>
							</>
						)}
					</div>

					{!data?.delivered && (
						<div className={cls.button}>
							<Button onClick={handleDeliverOrder} disabled={isMutationLoading}>
								{isMutationLoading ? 'Loading...' : 'Доставить'}
							</Button>
						</div>
					)}
				</div>

				<OrdersTable
					orders={data.orders_relationship}
					delivered={data.delivered}
				/>
			</div>
		</>
	)
}

export default ConsolidatedOrderInfo
