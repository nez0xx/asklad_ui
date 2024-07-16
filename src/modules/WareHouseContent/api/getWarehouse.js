import WarehouseService from '../../../services/WarehouseService';

export async function getWarehouse() {
	const response = await WarehouseService.getWarehouse();

	if (response.status >= 400) {
		throw new Error("Can't get warehouse!");
	}

	return response.data.warehouse;
}
