import { Komens, KomensMessage } from '../types/komens.js';
import { Mark, Marks, MarkSubject } from '../types/marks.js';
import { Change, Cycle, Timetable } from '../types/timetable.js';
export declare function formatTimetable(timetable: Timetable): FormattedTimetable;
export declare function formatMarks(marks: Marks): FormattedMarks;
export declare function formatKomens(general: Komens, noticeboard?: Komens): FormattedKomens;
interface FormattedMarksByDate {
    [key: string]: Mark & {
        Subject: MarkSubject;
    };
}
interface FormattedMarksBySubject {
    [key: string]: {
        Marks: Record<number, Mark>;
        Subject: MarkSubject;
        AverageText: string;
    };
}
interface FormattedMarks {
    date: FormattedMarksByDate;
    subject: FormattedMarksBySubject;
}
interface FormattedTimetableHour {
    Change: Change;
    Subject: string;
    Teacher: string;
    Room: string;
    CycleIds: string[] | null;
}
interface FormattedTimetableDay {
    hours: Record<number, FormattedTimetableHour[] | null>;
    dayInfo: {
        description: string;
        date: string;
    };
}
interface FormattedTimetable {
    hoursLabels: Record<number, {
        Id: number;
        Caption: string;
        BeginTime: string;
        EndTime: string;
    }>;
    days: Record<number, FormattedTimetableDay>;
    cycles: Record<string, Cycle>;
}
interface FormattedKomensMessage extends KomensMessage {
    channel: string;
    _timestamp?: number;
}
interface FormattedKomens {
    [key: string]: FormattedKomensMessage;
}
export type { FormattedKomens, FormattedKomensMessage, FormattedMarks, FormattedMarksByDate, FormattedMarksBySubject, FormattedTimetable, FormattedTimetableDay, FormattedTimetableHour, };
