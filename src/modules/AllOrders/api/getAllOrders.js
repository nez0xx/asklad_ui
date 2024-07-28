import OrdersService from '../../../services/OrdersService'

export async function getAllOrders(search_string, givenStatus) {
	const filterStringQuery = search_string
		? `search_id=${encodeURIComponent(search_string)}`
		: ''
	const filterIsGivenQuery =
		givenStatus !== 'all' ? `is_given_out=${givenStatus === 'givenOut'}` : ''

	const query = [filterStringQuery, filterIsGivenQuery]
		.filter(Boolean)
		.join('&')
	const url = query ? `?${query}` : ''

	const response = await OrdersService.getAllOrders(url)
	return response.data
}
