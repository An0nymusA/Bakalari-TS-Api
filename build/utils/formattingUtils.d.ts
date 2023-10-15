import { Kommens, KommensMessage } from '../types/kommens.js';
import { Mark, Marks, Subject } from '../types/marks.js';
import { Change, Timetable } from '../types/timetable.js';
export declare function formatTimetable(timetable: Timetable): FormattedTimetable;
export declare function formatMarks(marks: Marks): FormattedMarks;
export declare function formatKommens(general: Kommens, noticeboard?: Kommens): FormattedKommens;
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
    }>;
}
interface FormattedKommensMessage extends KommensMessage {
    channel: string;
    _timestamp?: number;
}
interface FormattedKommens {
    [key: string]: FormattedKommensMessage;
}
export {};
