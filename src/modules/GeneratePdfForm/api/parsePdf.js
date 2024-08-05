import OrdersService from '../../../services/OrdersService'

export async function parsePdf(formData) {
	const response = await OrdersService.parsePdf(formData)

	return response.data
}
