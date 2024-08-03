import OrdersService from '../../../services/OrdersService';

export async function deleteConsolidatedOrder(id) {
	const response = await OrdersService.deleteConsolidatedOrder(id);
	return response;
}
