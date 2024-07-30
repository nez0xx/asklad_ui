import AuthService from '../../../services/AuthService'

export async function sendResetPassword({ token, password }) {
	const response = await AuthService.resetPassword(token, password)

	return response.data
}
