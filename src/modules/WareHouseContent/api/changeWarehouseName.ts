import WarehouseService from '@services/WarehouseService';

export async function changeWarehouseName(name) {
	return await WarehouseService.changeWarehouseName(name);
}
