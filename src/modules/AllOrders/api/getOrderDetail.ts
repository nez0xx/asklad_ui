import OrdersService from "@services/OrdersService";

export async function getOrderDetail({ id }) {
    const response = await OrdersService.orderDetail(id)
    return response.data
}
