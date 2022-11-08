import { DepartmentResponse } from "./department";
import { RolResponse } from "./rol";

export interface UserBase {
    last_names: string;
    names: string;
    identificaction_number: string;
    email: string;
    identification_type: string;
    active?: boolean;
    scale: string;
    phone?: string;
    office?: string;
    vinculation_type: string;
    department_id: number;
    rol_id: number;
}


export interface UserCreate extends UserBase {
    password?: string;
}


export interface UserUpdate extends UserBase{

}


export interface UserInDBBase extends UserBase{
    id: number;
    created_at: Date;
    updated_at: Date;
}


export interface UserResponse extends UserInDBBase{
    department: DepartmentResponse;
    rol: RolResponse
}