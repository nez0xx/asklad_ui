import WarehouseService from '@services/WarehouseService';

export async function createWarehouse(name) {
	return await WarehouseService.createWarehouse(name);
}
