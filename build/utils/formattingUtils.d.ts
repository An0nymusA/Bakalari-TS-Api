import { Komens, KomensMessage } from '../types/komens.js';
import { Mark, Marks, MarkSubject } from '../types/marks.js';
import { Change, Cycle, Timetable } from '../types/timetable.js';
export declare function formatTimetable(timetable: Timetable): FormattedTimetable;
export declare function formatMarks(marks: Marks): FormattedMarks;
export declare function formatKomens(general: Komens, noticeboard?: Komens): FormattedKomensMessage[];
export interface FormattedMarkByDate extends Mark {
    Subject: MarkSubject;
}
export interface FormattedMarksByDate {
    [key: string]: FormattedMarkByDate;
}
export interface FormattedMarkBySubject {
    Marks: {
        [key: string]: Mark;
    };
    Subject: MarkSubject;
    AverageText: string;
}
export interface FormattedMarksBySubject {
    [key: string]: FormattedMarkBySubject;
}
export interface FormattedMarks {
    Date: FormattedMarksByDate;
    Subject: FormattedMarksBySubject;
}
export interface FormattedTimetableHour {
    Change: Change;
    Subject: string;
    Teacher: string;
    Room: string;
    CycleIds: string[] | null;
}
export interface FormattedTimetableDay {
    Hours: Record<number, FormattedTimetableHour[] | null>;
    DayInfo: {
        Description: string;
        Date: string;
        Id: number;
    };
}
export interface FormattedTimetable {
    HoursLabels: Record<number, {
        Id: number;
        Caption: string;
        BeginTime: string;
        EndTime: string;
    }>;
    Days: Record<number, FormattedTimetableDay>;
    Cycles: Record<string, Cycle>;
}
export interface FormattedKomensMessage extends KomensMessage {
    Channel: 'noticeboard' | 'general';
}
