import { ApplicationType } from "./application_type";

export interface ApplicationSubType {
    name: string;
    application_type_id: number;
    extra: any;
    id: number;
    application_type: ApplicationType;
}