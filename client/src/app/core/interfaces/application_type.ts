export interface ApplicationType {
    name: string;
    description: string;
    id: number;
    who_can: string[]
}

export interface ApplicationSubType {
    name: string;
    application_type_id: number;
    extra: any;
    id: number;
}

export interface ApplicationTypeResponse extends ApplicationType {
    application_sub_type: ApplicationSubType[];
}