import { Komens, KomensMessage } from '../types/komens.js';
import { Mark, Marks, Subject } from '../types/marks.js';
import { Change, Cycle, Timetable } from '../types/timetable.js';
export declare function formatTimetable(timetable: Timetable): FormattedTimetable;
export declare function formatMarks(marks: Marks): FormattedMarks;
export declare function formatKomens(general: Komens, noticeboard?: Komens): FormattedKomens;
interface FormattedMarksByDate {
    [key: string]: Mark & {
        Subject: Subject;
    };
}
interface FormattedMarksBySubject {
    [key: string]: {
        Marks: Record<number, Mark>;
        Subject: Subject;
        AverageText: string;
    };
}
interface FormattedMarks {
    date: FormattedMarksByDate;
    subject: FormattedMarksBySubject;
}
interface FormattedTimetable {
    hoursLabels: Record<number, {
        Id: number;
        Caption: string;
        BeginTime: string;
        EndTime: string;
    }>;
    days: Record<number | string, {
        Change: Change;
        Subject: string;
        Teacher: string;
        Room: string;
        CycleIds: string[] | null;
    }>;
    cycles: Record<string, Cycle>;
}
interface FormattedKomensMessage extends KomensMessage {
    channel: string;
    _timestamp?: number;
}
interface FormattedKomens {
    [key: string]: FormattedKomensMessage;
}
export {};
