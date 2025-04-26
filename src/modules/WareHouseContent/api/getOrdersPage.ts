import WarehouseService from '@services/WarehouseService';

export async function getUnitedOrdersPage(page, limit) {
    const response = await WarehouseService.getUnitedOrdersPage(page, limit);
    if (response.status >= 400) {
        throw new Error("Can't get warehouse!");
    }

    return response.data;
}
