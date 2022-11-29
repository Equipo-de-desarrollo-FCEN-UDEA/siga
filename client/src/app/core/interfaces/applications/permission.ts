import { Application } from "@interfaces/application";
import { file_path } from "@interfaces/documents";

export interface PermissionCreate {
    application_sub_type_id: number;
    start_date: Date;
    end_date: Date;
    justification: string;
    documents?: file_path[];
}


export interface PermissionInDB extends PermissionCreate {
    id: string;
    resolution?: string;
}

export interface PermissionResponse extends Application {
    permission: PermissionInDB;
}