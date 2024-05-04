export interface Subscription {
    id: number;
    id_plan: number;
    due_date: string;
    status: boolean;
    message?: string;
    plan_title?: string;
    subtitle?: string;
    className?: string;
}

export interface Subscribe {
    status : string;
    message?: string;
}

export interface Code {
    code: string;
}