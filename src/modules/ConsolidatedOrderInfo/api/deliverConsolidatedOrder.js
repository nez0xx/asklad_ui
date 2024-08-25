import OrdersService from '../../../services/OrdersService'

export async function deliverConsolidatedOrder({
	united_order_id,
	notificate,
}) {
	const response = await OrdersService.deliverConsolidatedOrder(
		united_order_id,
		notificate
	)

	return response.data
}
