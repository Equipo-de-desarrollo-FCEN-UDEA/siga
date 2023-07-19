import { Status } from "./status";

export interface ApplicationStatus{
    observation: string;
    created_at: Date;
    status: Status;
    amount_approved?: number;
    document?: any[];
}

export interface ApplicationStatusCreate {
    application_id: number;
    status_id: number;
    observation: string;
    amount_approved?: number;
    documents?: any[];
}