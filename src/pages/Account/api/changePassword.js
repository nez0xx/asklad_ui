import AuthService from '../../../services/AuthService'

export async function changePassword({ password, new_password }) {
	const response = await AuthService.changePassword(password, new_password)

	return response.data
}
