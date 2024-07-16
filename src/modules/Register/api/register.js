import AuthService from '../../../services/AuthService';

export async function register({email, password, name}) {
	const response = await AuthService.register(email, password, name);

	if (response.status >= 400) {
		throw new Error('Cant login');
	}

	return response;
}
