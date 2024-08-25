import OrdersService from '@services/OrdersService'

export async function uploadOrder(formData) {
	return await OrdersService.uploadOrder(formData)
}
