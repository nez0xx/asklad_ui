import axios from "axios";
import { API_URL } from "../../../http";

export async function checkAuth() {
	const response = await axios.get(`${API_URL}/auth/refresh`, {
		withCredentials: true
	});

    return response;
}
