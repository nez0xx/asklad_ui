import AuthService from '../../../services/AuthService'

export async function createResetPasswordRequest(email) {
	const response = await AuthService.createResetPasswordRequest(email)

	return response.data
}
