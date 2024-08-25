import {InstanceInterface} from "@/interfaces/Instance/Instance.interface";

export interface LoginInterface extends InstanceInterface {
    data: TokenInterface
}

export interface TokenInterface {
    access_token: string
}

