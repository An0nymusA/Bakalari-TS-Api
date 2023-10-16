import { Kommens, KommensMessage } from '../types/kommens.js';
import { Mark, Marks, Subject } from '../types/marks.js';
import { Change, Hour, Timetable } from '../types/timetable.js';

export function formatTimetable(timetable: Timetable): FormattedTimetable {
    const hoursLabels: Record<number, Hour> = Object.values(timetable.Hours)
        .sort((a, b) => {
            const [aHour, aMinute] = a.BeginTime.split(':').map(Number);
            const [bHour, bMinute] = b.BeginTime.split(':').map(Number);

            return aHour * 60 + aMinute - (bHour * 60 + bMinute);
        })
        .reduce((acc, hour) => {
            acc[hour.Id] = hour;
            return acc;
        }, {});

    const hoursTemplate = Object.keys(hoursLabels).reduce((acc, hour) => {
        acc[hour] = null;
        return acc;
    }, {});

    const days = {};

    // Initialize days with a template
    for (let i = 1; i <= 5; i++) {
        days[i] = { ...hoursTemplate, label: i };
    }

    // Fill days with data
    Object.values(timetable.Days).forEach((day) => {
        day.Atoms.forEach((atom) => {
            days[day.DayOfWeek][atom.HourId] = {
                Subject: timetable.Subjects[atom.SubjectId]?.Abbrev,
                Teacher: timetable.Teachers[atom.TeacherId]?.Abbrev,
                Room: timetable.Rooms[atom.RoomId]?.Abbrev,
                Change: atom.Change,
            };
        });
    });

    // Remove unused hour
    Object.keys(hoursLabels).forEach((hourId) => {
        if (Object.values(days).every((day) => day[hourId] === null)) {
            for (const day of Object.values(days)) {
                delete day[hourId];
            }
        }
    });

    return { hoursLabels, days };
}

export function formatMarks(marks: Marks): FormattedMarks {
    // Marks grouped by Subject
    const subject = Object.values(marks.Subjects).reduce((acc, subject) => {
        const marksMap = subject.Marks.reduce((marksAcc, mark) => {
            marksAcc[mark.Id] = mark;
            return marksAcc;
        }, {});

        acc[subject.Subject.Id] = {
            Marks: marksMap,
            Subject: subject.Subject,
            AverageText: subject.AverageText,
        };
        return acc;
    }, {});

    // Marks sorted by date
    const date = Object.values(marks.Subjects)
        .flatMap((subject) =>
            subject.Marks.map((mark) => ({
                ...mark,
                Subject: subject.Subject,
            })),
        )
        .sort((a, b) => {
            // Convert the dates once before sorting
            const aTime = new Date(a.MarkDate).getTime();
            const bTime = new Date(b.MarkDate).getTime();
            return bTime - aTime;
        })
        .reduce((acc, mark) => {
            acc[mark.Id] = mark;
            return acc;
        }, {});

    return { subject, date };
}

export function formatKommens(
    general: Kommens,
    noticeboard?: Kommens,
): FormattedKommens {
    const reduceKommens = (
        kommens: Kommens | undefined,
        channel: string,
    ): FormattedKommensMessage[] => {
        if (!kommens || !kommens.Messages) return [];

        return Object.values(kommens.Messages).map((message) => ({
            channel,
            ...message,
        }));
    };

    const formatted: FormattedKommensMessage[] = [
        ...reduceKommens(noticeboard, 'noticeboard'),
        ...reduceKommens(general, 'general'),
    ];

    formatted.forEach((message) => {
        message._timestamp = new Date(message.SentDate).getTime();
    });

    return formatted
        .sort((a, b) => b._timestamp - a._timestamp)
        .reduce((acc, curr) => {
            acc[curr.Id] = curr;
            delete curr._timestamp;
            return acc;
        }, {});
}

interface FormattedMarksByDate {
    [key: string]: Mark & { Subject: Subject };
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
    hoursLabels: Record<
        number,
        {
            Id: number;
            Caption: string;
            BeginTime: string;
            EndTime: string;
        }
    >;
    days: Record<
        number | string,
        {
            Change: Change;
            Subject: string;
            Teacher: string;
            Room: string;
        }
    >;
}

interface FormattedKommensMessage extends KommensMessage {
    channel: string;
    _timestamp?: number;
}

interface FormattedKommens {
    [key: string]: FormattedKommensMessage;
}
