import WarehouseService from '../../../services/WarehouseService';

export async function createWarehouse(name) {
	const response = await WarehouseService.createWarehouse(name);
	return response;
}
