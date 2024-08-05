import OrdersService from '../../../services/OrdersService'

export async function uploadOrder(formData) {
	const response = await OrdersService.uploadOrder(formData)

	return response
}
