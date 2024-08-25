import WarehouseService from '@services/WarehouseService'

export async function addEmployee(employee_email) {
	const response = await WarehouseService.addEmployeeToWarehouse(employee_email)

	return response.data
}
