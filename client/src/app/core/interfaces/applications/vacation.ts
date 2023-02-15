import { Application } from "@interfaces/application";
import { file_path } from "@interfaces/documents";

export interface VacationCreate {
    application_sub_type_id: number;
    start_date: Date;
    end_date: Date;
    justification: string;
    sign?: file_path;
    documents?: file_path[];
}


export interface VacationInDB extends VacationCreate {
    id: string;
    resolution?: string;
}

export interface VacationResponse extends Application {
    permission: VacationInDB;
}