export interface IUserApplication {
  amount: number;
  response: number;
}

export interface IUserApplicationCreate {
  user_id: number;
  application_id: number;
  amount: number;
  response: number;
}