import AuthService from '@services/AuthService';
import axios from "axios";
import {RegistrationInterface} from "@/interfaces/Auth/Register.interface";

export async function register({email, password, name}) {
	const response:axios.AxiosResponse<RegistrationInterface> = await AuthService.register(email, password, name);

	if (response.status >= 400) {
		throw new Error('Cant login');
	}

	return response;
}
