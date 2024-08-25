import OrdersService from '@services/OrdersService'

export async function getFinReport(date_min, date_max) {
	const response = await OrdersService.getFinReport(date_min, date_max)

	return response.data
}
