import { Topic } from "./development-plan";

export interface ViceFormat {
    time: number;
    field: string;
    description: string;
    goals: string[];
    products: string[];
    dev_action_plan: Topic[];
}

