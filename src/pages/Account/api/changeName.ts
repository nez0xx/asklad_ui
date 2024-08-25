import AuthService from '@services/AuthService'
import axios from "axios";
import {EmployerChangeNameInterface} from "@/interfaces/Employer/EmployerChangeName.interface";

export async function changeName(new_name) {
    const response: axios.AxiosResponse<EmployerChangeNameInterface> = await AuthService.changeName(new_name<string>)
    return response.data
}
