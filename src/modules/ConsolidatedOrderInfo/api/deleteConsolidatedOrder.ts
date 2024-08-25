import OrdersService from '@services/OrdersService';

export async function deleteConsolidatedOrder(id) {
	return await OrdersService.deleteConsolidatedOrder(id);
}
