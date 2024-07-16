import OrdersService from '../../../services/OrdersService';

export async function getAllOrders() {
	const response = await OrdersService.getAllOrders();
	return response.data;
}
