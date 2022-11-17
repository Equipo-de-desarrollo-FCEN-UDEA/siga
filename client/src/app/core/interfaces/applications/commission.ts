import { Application } from "@interfaces/application";
import { file_path } from "@interfaces/documents";

export interface CommissionCreate {
    application_sub_type_id: number;
    country: string;
    state?: string;
    city?: string;
    start_date: Date;
    end_date: Date;
    lenguage: string;
    justification: string;
    documents?: file_path[];
}


export interface CommissionInDB extends CommissionCreate {
    id: string;
    resolution?: string;
    cumplido?: string;
}


export interface CommissionResponse extends Application {
    commission: CommissionInDB;
}
