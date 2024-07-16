import WarehouseService from '../../../services/WarehouseService';

export async function deleteWarehouse() {
	const response = await WarehouseService.deleteWarehouse();
	return response;
}
