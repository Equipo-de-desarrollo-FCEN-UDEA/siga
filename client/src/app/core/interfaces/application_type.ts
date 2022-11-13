export interface ApplicationType {
    name: string;
    description: string;
    id: number;
    status_flux: StatusFlux[];
}

export interface StatusFlux {
    status: string;
    scope: number[];
}