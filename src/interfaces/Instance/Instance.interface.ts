import {AxiosRequestHeaders} from "axios";

export interface InstanceInterface {
    status?: number
    statusText?: string
    headers?: AxiosRequestHeaders
    config?: any
    request?: any
}