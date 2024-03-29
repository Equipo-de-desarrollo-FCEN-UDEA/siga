import { Application } from "@interfaces/application";
import { file_path } from "@interfaces/documents";

export interface VacationCreate {
    application_sub_type_id: number;
    total_days: number;
    vacationType: boolean;
    start_date: Date;
    end_date: Date;
    signature: string;
    documents?: file_path[];
    }


export interface VacationInDB extends VacationCreate {
    id: string;
    resolution?: string;
}

export interface VacationResponse extends Application {
    vacation: VacationInDB;
}