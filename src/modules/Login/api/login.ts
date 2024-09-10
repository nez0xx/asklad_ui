import AuthService from '@services/AuthService'


export async function login({ email, password }) {
	const response = await AuthService.login(email, password)
	//@ts-ignore
	response ? localStorage.setItem('token', response.data.access_token)  : null
	// debugger
	// const accessToken = response?.data?.access_token

	return response.data
}

