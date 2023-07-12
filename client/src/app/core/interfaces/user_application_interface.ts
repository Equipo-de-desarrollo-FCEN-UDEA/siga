import { file_path } from "./documents";

export interface IUserApplication {
  user_id: number;
  amount: number;
  response: number;
  document: file_path[];
}

export interface IUserApplicationCreate {
  application_id: number;
  user_id: number;
  amount: number;
  response: number;
  document: file_path[];
}