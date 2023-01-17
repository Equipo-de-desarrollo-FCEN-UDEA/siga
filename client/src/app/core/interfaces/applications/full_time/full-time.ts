import { InitialLetter } from "./letter";
import { ViceFormat } from "./vice-format";
import { WorkPlan } from "./work-plan";

import { Application } from "@interfaces/application";
import { file_path } from "@interfaces/documents";


export interface FullTimeCreate {
    title: string;
    documents?: file_path[];
}


export interface FullTimeInDB extends FullTimeCreate {
    id: string;
    work_plan?: WorkPlan;
    vice_format?: ViceFormat;
    initial_letter?: InitialLetter;
}

export interface FulltimeResponse extends Application {
    full_time: FullTimeInDB
}