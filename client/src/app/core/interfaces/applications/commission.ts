import { Application } from "@interfaces/application";

export interface CommissionCreate {
    country: string;
    state: string;
    city: string;
    start_date: Date;
    end_date: Date;
    lenguage: string;
    justification: string;
}


export interface CommissionInDB extends CommissionCreate {
    id: string;
}


export interface CommissionResponse extends Application {
    commission: CommissionInDB;
}
