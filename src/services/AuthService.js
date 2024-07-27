import $api from '../http'

export default class AuthService {
	static async login(email, password) {
		return $api.post(`/auth/login`, { email, password })
	}

	static async register(email, password, name) {
		return $api.post(`/auth/signup`, { email, password, name })
	}
}
