import WarehouseService from '@services/WarehouseService';

export async function getOrdersUnited() {
	const response = await WarehouseService.getOrdersUnited();
	if (response.status >= 400) {
		throw new Error("Can't get warehouse!");
	}

	return response.data;
}
