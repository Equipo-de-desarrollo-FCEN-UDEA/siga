import { Topic } from "./development-plan";

export interface ViceFormat {
    time: number;
    field: string;
    description: string;
    goals: Goal[];
    products: Product[];
    dev_action_plan: Topic[];
}

export interface Goal{
    goal: string;
}

export interface Product{
    product: string;
}