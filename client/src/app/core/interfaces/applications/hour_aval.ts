import { Application } from "../application";

export interface HourAvalBase {
    time: number;
    hours_week: number;
    description: string;
    announcement: string;
    entity: string;
    role: string;
    another_applicants: Applicant[] | null;
    products: Product[];
    application_sub_type_id: number;
}

export interface HourAvalCreate extends HourAvalBase {

}

export interface HourAvalUpdate extends HourAvalBase {

}

export interface Applicant {
    email: string;
    acepted: boolean | null;
    role: string;
}

export interface Product {
    name: string;
    description: string;
}


export interface HourAvalInDB extends HourAvalBase {
    id: string;
    letter_path: string | null;
}

export interface HourAvalResponse extends Application {
    hour_aval: HourAvalInDB
}
