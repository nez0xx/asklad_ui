import $api from '@http/../http'

export default class OrdersService {
	static async getFinReport(date_min, date_max) {
		return $api.get(
			`/orders/fin_report?date_min=${date_min}&date_max=${date_max}`
		)
	}

	static async generateExcel(list) {
		return $api.post('/orders/gen_excel/', list, { responseType: 'blob' })
	}

	static async uploadOrder(formData) {
		return $api.post('/orders/upload', formData)
	}

	static async parsePdf(formData) {
		return $api.post('/orders/parse_pdf/', formData, { responseType: 'blob' })
	}

	static async orderDetail(id) {
		return $api.get(`/orders/${id}`)
	}

	static async giveOutOrder(id, comment = '') {
		if (comment) {
			return $api.post(`/orders/give_out?order_id=${id}&comment=${comment}`)
		}

		return $api.post(`/orders/give_out?order_id=${id}`)
	}

	static async deliverConsolidatedOrder(united_order_id, notificate = false) {
		return $api.post(
			`/orders/delivery?united_order_id=${united_order_id}&notificate=${notificate}`
		)
	}
	static async deleteConsolidatedOrder(id) {
		return $api.delete(`/orders/delete?united_order_id=${id}`)
	}

	static async getAllOrders(query) {
		return $api.get(`/orders/all${query}`)
	}
}
