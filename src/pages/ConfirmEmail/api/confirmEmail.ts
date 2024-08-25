import AuthService from '@services/AuthService'

export async function confirmEmail(token) {
	const response = await AuthService.confirmEmail(token)

	return response.data
}
