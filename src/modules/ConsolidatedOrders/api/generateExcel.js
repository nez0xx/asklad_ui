import OrdersService from '../../../services/OrdersService'

export async function generateExcel(list) {
	const response = await OrdersService.generateExcel(list)

	return response.data
}
