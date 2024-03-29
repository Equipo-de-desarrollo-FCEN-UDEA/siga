import { Application } from "@interfaces/application";
import { DepartmentBase } from "@interfaces/department";
import { file_path } from "@interfaces/documents";
import { UserBase } from "@interfaces/user";
import { ComplimentCreate } from "./commission";

export interface IApplicationData { 
  application_type: string;
  project: string; 
  goal: string; 
}

export interface IPersonalData { 
  application_for: string;
  name: string;
  identification_number: string;
  address: string; 
  landline?: string;
  city: string;
  email: string;
  phone: string;
  institution?: string;
  academic_unit?: string;
}

export interface ITickets { 
  //birthdate: Date;
  place_birth: string;
  departure_date: Date;
  departure_place: string;
  arrival_date: Date;
  arrival_place: string;
}

export interface IAdvancePayment { 
  name: string;
  id: string;
  bank: string;
  value: string;
  account_number: string;
  account_type: string;
  start_date: Date;
  end_date: Date;
}

export interface IDependence { 
  id: number;
  name: string;
}

export interface ISubdepartment { 
  id: number;
  ccrg_code: string;
  coordinador_id: number;
  coordinador: UserBase;
  deparment_id: number;
  deparment: DepartmentBase;
  name: string;
}

export interface IEconomicSupportCreate {
  application_sub_type_id: number;
  dependence: IDependence[];
  application_data: IApplicationData;
  personal_data: IPersonalData;
  tickets: ITickets;
  payment: IAdvancePayment;
  documents?: file_path[];
}


export interface IEconomicSupportInDB extends IEconomicSupportCreate {
  id: string;
  compliment?: ComplimentCreate;
}

export interface IEconomicSupportResponse extends Application {
  economic_support: IEconomicSupportInDB;
}


