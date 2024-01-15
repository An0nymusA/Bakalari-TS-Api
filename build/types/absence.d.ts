export interface Absence {
    Date: string;
    Unsolved: number;
    Ok: number;
    Missed: number;
    Late: number;
    Soon: number;
    School: number;
    DistanceTeaching: number;
}
export interface AbsencesPerSubject {
    SubjectName: string;
    LessonsCount: number;
    Base: number;
    Late: number;
    Soon: number;
    School: number;
    DistanceTeaching: number;
}
export interface Absences {
    PercentageThreshold: number;
    Absences: Absence[];
    AbsencesPerSubject: AbsencesPerSubject[];
}
