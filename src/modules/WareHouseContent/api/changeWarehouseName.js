import WarehouseService from '../../../services/WarehouseService';

export async function changeWarehouseName(name) {
	const response = await WarehouseService.changeWarehouseName(name);
	return response;
}
