export interface Objective{
    id: number;
    description: string;
    actions: Action[];
    indicators?: Indicator[];
}

export interface Action {
  id: number;
  description: string;
}

export interface Indicator {
  id: number;
  description: string;
}

export interface Topic {
    id: number;
    title: string;
    subtitle: string;
    objectives?: Objective[];
}

export interface ObjectiveTopicId extends Objective{
  idTopic: number;
}