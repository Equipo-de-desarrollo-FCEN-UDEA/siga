export interface ViceFormat {
    time: number;
    field: string;
    description: string;
    goals: string[];
    products: string[];
    dev_action_plan: DevActionPlan[];
}

export interface DevActionPlan {
    title: string;
    subtitle: string;
    objectives: Objectives;  //Ask about array
}

export interface Objectives {
    description: string;
    actions: string[];
    indicators: string[];
}