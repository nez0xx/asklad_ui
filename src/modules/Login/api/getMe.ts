import AuthService from '@services/AuthService'
import axios from "axios";
import {AuthInterface} from "@/interfaces/Auth/Auth.interface";

export async function getMe() {
    const response: axios.AxiosResponse<AuthInterface> = await AuthService.getMe()
    return response.data
}
