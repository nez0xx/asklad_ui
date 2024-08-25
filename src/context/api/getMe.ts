import AuthService from '../../services/AuthService'

export async function getMe() {
	const response = await AuthService.getMe()

	return response.data
}
