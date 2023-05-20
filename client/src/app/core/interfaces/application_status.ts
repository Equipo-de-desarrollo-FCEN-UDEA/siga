import { Status } from "./status";

export interface ApplicationStatus{
    observation: string;
    amount_approved?: string;
    created_at: Date;
    status: Status;
}

export interface ApplicationStatusCreate {
    application_id: number;
    amount_approved?: string;
    status_id: number;
    observation: string;
}