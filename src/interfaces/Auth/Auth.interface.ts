import {InstanceInterface} from "@/interfaces/Instance/Instance.interface";

export interface AuthInterface extends InstanceInterface {
    data: AuthData
}

export interface AuthData {
    created_at: string
    email: string
    hashed_password: string
    id: number
    is_admin: boolean
    is_verify: boolean
    name: string
}

