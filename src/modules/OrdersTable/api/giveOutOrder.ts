import OrdersService from '@services/OrdersService'

export async function giveOutOrder({ id, comment = '' }) {
	const response = await OrdersService.giveOutOrder(id, comment)

	return response.data
}
