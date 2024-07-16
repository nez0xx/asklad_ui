import $api from '../http';

export default class OrdersService {
	static async uploadOrder(formData) {
		return $api.post('/orders/upload', formData);
	}

	static async orderDetail(id) {
		return $api.get(`/orders/${id}`);
	}

	static async giveOutOrder(id) {
		return $api.post(`/orders/give_out?order_id=${id}`);
	}
	
	static async deleteConsolidatedOrder(id) {
		return $api.delete(`/orders/delete?united_order_id=${id}`);
	}

	static async getAllOrders() {
		return $api.get('/orders/all')
	}
}
