import OrdersService from '../../../services/OrdersService'

export async function getAllOrders(str) {
	const response = await OrdersService.getAllOrders(`search_string=${str}`)
	return response.data
}
