import OrdersService from '@services/OrdersService'

export async function getAllOrdersPage(page, limit) {
    const response = await OrdersService.getAllOrdersPage(page, limit)
    return response.data
}
