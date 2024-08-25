import WarehouseService from '@services/WarehouseService'

export async function getConsolidatedOrderOrders({ id }) {
	const response = await WarehouseService.getOrdersOfConsolidatedOrder(id)

	return response.data
}
