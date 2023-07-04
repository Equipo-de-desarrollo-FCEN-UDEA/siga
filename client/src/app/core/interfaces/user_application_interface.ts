export interface IUserApplication {
  user_id: number;
  amount: number;
  response: number;
}

export interface IUserApplicationCreate {
  application_id: number;
  user_id: number;
  amount: number;
  response: number;
}