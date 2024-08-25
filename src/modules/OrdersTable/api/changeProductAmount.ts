import WarehouseService from '@services/WarehouseService'

export async function changeProductAmount(product) {
	return await WarehouseService.changeProductAmount(product)
}
