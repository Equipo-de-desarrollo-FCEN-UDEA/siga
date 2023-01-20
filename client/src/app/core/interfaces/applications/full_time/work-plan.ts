export interface WorkPlan {
    period: string;
    registro: string;
    partial_time: number;
    teaching_activities: TeachingActivity[];
    investigation_activities: InvestigationActivity[];
    extension_activities: ExtensionActivity[];
    academic_admin_activities: AcademicAdminActivity[];
    other_activities: OtherActivity[];
    working_week: WorkingWeek;
}

export interface AcademicAdminActivity {
    position: string;
    week_hours: number;
    period_hours: number;
    activities: string;
    activity_tracking: ActivityTracking;
}

export interface ActivityTracking {
    date_1: Date;
    date_2: Date;
    other: string;
}

export interface ExtensionActivity {
    code: string;
    activity_identification: string;
    responsibility: string;
    cost: string;
    week_hours: number;
    period_hours: number;
    activity_tracking: ActivityTracking;
}

export interface InvestigationActivity {
    code: string;
    project_identification: string;
    responsibilities: string;
    cost: string;
    supporting_document: string;
    period_hours: number;
    activity_tracking: ActivityTracking;
}

export interface OtherActivity {
    activity: string;
    period_hours: string;
    activity_tracking: ActivityTracking;
}

export interface TeachingActivity {
    activity_identification: ActivityIdentification;
    student_quantity: number;
    level: string;
    week_hours: WeekHours;
    total_hours: number;
    activity_tracking: ActivityTracking;
}

export interface ActivityIdentification {
    code: string;
    group: number;
    name: string;
}

export interface WeekHours {
    t: number;
    tp: number;
    p: number;
}

export interface WorkingWeek {
    monday: Day;
    tuesday: Day;
    wednesday: Day;
    thursday: Day;
    friday: Day;
    saturday: Day;
}

export interface Day {
    morning_start: string;
    morning_end: string;
    afternoon_start: string;
    afternoon_end: string;
}