import { Application } from "@interfaces/application";
import { file_path } from "@interfaces/documents";

export interface IBudget {
  description: string;
  amount: number;
}

export interface IEconomicSupportCreate {
  start_date: Date;
  end_date: Date;
  country: string;
  support: any;
  justification: string;
  budget: IBudget[];
  documents: file_path[];

  lenguage?: string;
  state?: string;
  city?: string;
}


export interface IEconomicSupportInDB extends IEconomicSupportCreate {
  id: string;
  documents: file_path[];
}

export interface IEconomicSupportResponse extends Application {
  economic_support: IEconomicSupportInDB;
}


