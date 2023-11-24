import { InitialLetter } from "./letter";
import { ViceFormat } from "./vice-format";
import { WorkPlan } from "./work-plan";

import { Application } from "@interfaces/application";
import { file_path } from "@interfaces/documents";


export interface FullTimeCreate {
    title: string;
    start_date: Date;
    end_date: Date;
    documents?: file_path[];
}


export interface FullTimeInDB extends FullTimeCreate {
    id: number;
    work_plan?: WorkPlan;
    vice_format?: ViceFormat;
    initial_letter?: InitialLetter;
}

export interface FulltimeResponse extends Application {
    full_time: FullTimeInDB
}