import AuthService from '../../services/AuthService'

export async function getMe() {
	 return await AuthService.getMe()
}
