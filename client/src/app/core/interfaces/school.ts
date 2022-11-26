export interface SchoolBase {
    name: string;
    description: string;
    cost_center: number;
    email_dean: string;
}


export interface SchoolInDB extends SchoolBase {
    id: number
}


export interface SchoolResponse extends SchoolInDB {
    
}