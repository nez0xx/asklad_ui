import WarehouseService from '../../../services/WarehouseService';

export async function changeProductAmount(product) {
	const response = await WarehouseService.changeProductAmount(product);
	return response;
}
