import WarehouseService from '../../../services/WarehouseService';

export async function getConsolidatedOrderOrders({ id }) {
	console.log(id);
	const response = await WarehouseService.getOrdersOfConsolidatedOrder(id);

	return response.data;
}
