import { Application } from "@interfaces/application";
import { file_path } from "@interfaces/documents";

export interface ReportFullTimeCreate {
    application_sub_type_id: number;
    title:string
    from_full_time: boolean
    full_time_id: number;
    documents?: file_path[];
    justification: string;
}

export interface ReportFullTimeInDB extends ReportFullTimeCreate {
    id: string;
}

export interface ReportFullTimeResponse extends Application {
    report_full_time: ReportFullTimeInDB;
}