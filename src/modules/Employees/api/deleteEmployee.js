import WarehouseService from '../../../services/WarehouseService'

export async function deleteEmployee(employee_id) {
	const response = await WarehouseService.deleteEmployeeFromWarehouse(
		employee_id
	)

	return response.data
}
