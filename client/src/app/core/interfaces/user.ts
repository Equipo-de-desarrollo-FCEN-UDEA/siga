import { DepartmentResponse } from "./department";
import { UserRolResponse } from "./userrol";

export interface UserBase {
    last_names: string;
    names: string;
    identification_number: string;
    email: string;
    identification_type: string;
    active?: boolean;
    scale: string;
    phone?: string;
    office?: string;
    vinculation_type: string;
    department_id: number;
}


export interface UserCreate extends UserBase {
    password?: string;
}


export interface UserUpdate extends UserBase{
    changes_rol: boolean;
}


export interface UserInDBBase extends UserBase{
    id: number;
    created_at: Date;
    updated_at: Date;
}


export interface UserResponse extends UserInDBBase{
    department: DepartmentResponse;
    userrol: UserRolResponse[];
}


export interface UserByPass {
    email: string;
    names: string;
    last_names: string;
    vinculation_type: string;
}