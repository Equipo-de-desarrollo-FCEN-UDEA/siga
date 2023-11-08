import { SchoolResponse } from "./school";

export interface DepartmentBase {
    name: string;
    description: string;
    coord_email: string;
    secre_email: string;
    school_id: number;
    cost_center?: number;
}


export interface DepartmentInDB extends DepartmentBase {
    id: number;
}

export interface DepartmentResponse extends DepartmentInDB{
    school: SchoolResponse;
}
