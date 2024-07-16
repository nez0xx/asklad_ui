import OrdersService from '../../../services/OrdersService';

export async function giveOutOrder(id) {
	const response = await OrdersService.giveOutOrder(id);
	return response;
}
