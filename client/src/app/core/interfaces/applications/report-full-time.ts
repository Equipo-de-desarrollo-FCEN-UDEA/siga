import { Application } from "@interfaces/application";
import { file_path } from "@interfaces/documents";

export interface ReportFullTimeCreate {
    application_sub_type_id: 15;
    from_full_time: boolean;
    title:string;
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