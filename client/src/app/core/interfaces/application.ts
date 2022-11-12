import { ApplicationStatus } from "./application_status";
import { ApplicationSubType } from "./application_subtype";
import { UserInDBBase, UserResponse } from "./user";

export interface Application {
    mongo_id: string;
    application_sub_type_id: number;
    filed: boolean;
    id: number;
    created_at: Date;
    application_sub_type: ApplicationSubType;
    application_status: ApplicationStatus[];
    user: UserResponse;
}