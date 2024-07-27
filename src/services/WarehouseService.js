import $api from '../http'

export default class WarehouseService {
	static async getWarehouse() {
		return $api.get(`/warehouse/`)
	}

	static async getOrdersOfConsolidatedOrder(united_order_id) {
		return $api.get(`/orders/united/${united_order_id}`)
	}

	static async changeWarehouseName(name) {
		return $api.patch('/warehouse/', {
			name,
		})
	}

	static async deleteWarehouse() {
		return $api.delete('/warehouse/')
	}

	static async createWarehouse(name) {
		return $api.post(`/warehouse/?name=${name}`)
	}

	static async getAllProducts() {
		return $api.get('/products/all')
	}

	static async changeProductAmount(product) {
		return $api.patch(
			`/products/change_amount?order_id=${product.order_id}&product_id=${product.product_id}&amount=${product.amount}`
		)
	}
}
