import AuthService from '../../../services/AuthService';

export async function login({email, password}) {
	const response = await AuthService.login(email, password);

	console.log(response.status);

	if (response.status >= 400) {
		throw new Error('Cant login');
	}

	return response;
}
