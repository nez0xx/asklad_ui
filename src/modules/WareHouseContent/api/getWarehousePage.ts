import WarehouseService from '@services/WarehouseService';

export async function getWarehousePage(page, limit) {
    const response = await WarehouseService.getUnitedWarehouse(page, limit);
    if (response.status >= 400) {
        throw new Error("Can't get warehouse!");
    }

    return response.data;
}
