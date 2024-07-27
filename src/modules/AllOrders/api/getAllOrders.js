import OrdersService from '../../../services/OrdersService'

export async function getAllOrders(search_string, is_given_out) {
	const response = await OrdersService.getAllOrders(
		`?${search_string && `search_string=${search_string}`}${
			is_given_out && `&is_given_out=${is_given_out}`
		}`
	)
	return response.data
}
