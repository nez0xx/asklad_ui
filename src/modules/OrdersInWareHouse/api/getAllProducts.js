import WarehouseService from '../../../services/WarehouseService';

export async function getAllProducts() {
	const response = await WarehouseService.getAllProducts();
	return response.data;
}
