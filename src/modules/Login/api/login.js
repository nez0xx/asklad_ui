import AuthService from '../../../services/AuthService'

export async function login({ email, password }) {
	const response = await AuthService.login(email, password)

	return response.data
}
