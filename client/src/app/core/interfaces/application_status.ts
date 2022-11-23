import { Status } from "./status";

export interface ApplicationStatus{
    observation: string;
    created_at: Date;
    status: Status;
}

export interface ApplicationStatusCreate {
    application_id: number;
    status_id: number;
    observation: string;
}