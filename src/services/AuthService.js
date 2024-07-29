import $api from '../http'

export default class AuthService {
	static async login(email, password) {
		return $api.post(`/auth/login`, { email, password })
	}

	static async register(email, password, name) {
		return $api.post(`/auth/signup`, { email, password, name })
	}

	static async confirmEmail(token) {
		return $api.post(`/auth/confirm/?token=${token}`)
	}

	static createResetPasswordRequest(email) {
		return $api.post(`/auth/reset_pass/request?user_email=${email}`)
	}

	static resetPassword(token, password) {
		return $api.post(`/auth/reset_pass/?token=${token}&password=${password}`)
	}
}
