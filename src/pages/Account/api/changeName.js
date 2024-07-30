import AuthService from '../../../services/AuthService'

export async function changeName(new_name) {
	const response = await AuthService.changeName(new_name)

	return response.data
}
