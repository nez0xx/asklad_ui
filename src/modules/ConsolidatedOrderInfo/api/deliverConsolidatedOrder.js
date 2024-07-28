import OrdersService from '../../../services/OrdersService'

export async function deliverConsolidatedOrder({ united_order_id }) {
	const response = await OrdersService.deliverConsolidatedOrder(united_order_id)

	return response.data
}
