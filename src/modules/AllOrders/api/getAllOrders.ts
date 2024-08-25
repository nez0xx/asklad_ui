import OrdersService from '@services/OrdersService'

export async function getAllOrders(search_id, givenStatus, search_name) {
	const filterIDQuery = search_id ? `search_id=${search_id}` : ''
	const filterIsGivenQuery =
		givenStatus !== 'all' ? `is_given_out=${givenStatus === 'givenOut'}` : ''
	const filterNameQuery = search_name
		? `search_name=${search_name.toUpperCase()}`
		: ''

	const query = [filterIDQuery, filterIsGivenQuery, filterNameQuery]
		.filter(Boolean)
		.join('&')
	const url = query ? `?${query}` : ''

	const response = await OrdersService.getAllOrders(url)
	return response.data
}
