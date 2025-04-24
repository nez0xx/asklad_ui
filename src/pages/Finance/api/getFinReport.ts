import OrdersService from '@services/OrdersService'

export async function getFinReport(date_min, date_max) {
	const response = await OrdersService.getFinReport(date_min, date_max);
	if (!response.data || Object.keys(response.data).length === 0) {
	  return {
		"total_price": {
		  "rub": 0
		},
		"total_pv": 0,
		"orders": {}
	  };
	}
	return response.data;
}
