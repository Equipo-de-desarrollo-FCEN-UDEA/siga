import { Status } from "./status";

export interface ApplicationStatus{
    observation: string;
    created_at: Date;
    status: Status;
}