import { Application } from '@interfaces/application';
import { file_path } from '@interfaces/documents';

export interface VacationCreate {
  start_date: Date;
  end_date: Date;
  total_working_days: number;
  start_working_date: Date | null;
  end_working_date: Date | null;
  total_calendar_days: number;
  start_calendar_date: Date | null;
  end_calendar_date: Date | null;
  documents?: file_path[];
  signature: string;
  application_sub_type_id: number;
}

export interface VacationInDB extends VacationCreate {
  id: string;
  resolution?: string;
}

export interface VacationResponse extends Application {
  vacation: VacationInDB;
}
