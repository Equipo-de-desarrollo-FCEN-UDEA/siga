import { RolResponse } from "./rol";

export interface UserRolBase {
    rol_id: number;
    user_id: number;
}


export interface UserRolInDBase extends UserRolBase{
    id: number;
}


export interface UserRolResponse extends UserRolInDBase{
    rol: RolResponse;
}