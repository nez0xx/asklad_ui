import $api from "../http/index.ts";
import {EmployerChangeNameInterface} from "@/interfaces/Employer/EmployerChangeName.interface";
import axios from "axios";
import {AuthInterface} from "@/interfaces/Auth/Auth.interface";
import {LoginInterface} from "@/interfaces/Auth/Login.interface";

export default class AuthService {
	static async getMe(): Promise<axios.AxiosResponse<AuthInterface>>  {
		return $api.get(`/auth/me`)
	}

	static async changeName(new_name: string): Promise<axios.AxiosResponse<EmployerChangeNameInterface>> {
		return $api.post(`/auth/change_name?new_name=${new_name}`)
	}

	static async changePassword(password: string, new_password: string) {
		return $api.post(
			`/auth/change_password?password=${password}&new_password=${new_password}`
		)
	}

	static async login(email: string, password: string): Promise<axios.AxiosResponse<LoginInterface>> {
		return $api.post(`/auth/login`, { email, password })
	}

	static async register(email: string, password: string, name: string) {
		return $api.post(`/auth/signup`, { email, password, name })
	}

	static async confirmEmail(token: string) {
		return $api.post(`/auth/confirm/?token=${token}`)
	}

	static createResetPasswordRequest(email: string) {
		return $api.post(`/auth/reset_pass/request?user_email=${email}`)
	}

	static resetPassword(token: string, password: string) {
		return $api.post(`/auth/reset_pass/?token=${token}&password=${password}`)
	}
}
