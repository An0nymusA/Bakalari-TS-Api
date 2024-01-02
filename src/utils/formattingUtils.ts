import { Komens, KomensMessage } from '../types/komens.js';
import { Mark, Marks, Subject } from '../types/marks.js';
import { Change, Cycle, Hour, Timetable } from '../types/timetable.js';

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
            // Check if there is already an entry for the HourId, if not, initialize with an empty array
            if (!days[day.DayOfWeek][atom.HourId]) {
                days[day.DayOfWeek][atom.HourId] = [];
            }

            // Create a new object representing the current atom's information
            const atomInfo = {
                Subject: timetable.Subjects[atom.SubjectId]?.Abbrev,
                Teacher: timetable.Teachers[atom.TeacherId]?.Abbrev,
                Room: timetable.Rooms[atom.RoomId]?.Abbrev,
                Change: atom.Change,
                CycleIds: atom.CycleIds.reduce((acc, curr) => {
                    acc.push(timetable.Cycles[curr]?.Abbrev);
                    return acc;
                }, []),
            };

            // Push the new atom information to the list of atoms for this HourId
            days[day.DayOfWeek][atom.HourId].push(atomInfo);
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

    return { hoursLabels, days, cycles: timetable.Cycles };
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

export function formatKomens(
    general: Komens,
    noticeboard?: Komens,
): FormattedKomens {
    const reduceKomens = (
        komens: Komens | undefined,
        channel: string,
    ): FormattedKomensMessage[] => {
        if (!komens || !komens.Messages) return [];

        return Object.values(komens.Messages).map((message) => ({
            channel,
            ...message,
        }));
    };

    const formatted: FormattedKomensMessage[] = [
        ...reduceKomens(noticeboard, 'noticeboard'),
        ...reduceKomens(general, 'general'),
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
            CycleIds: string[] | null;
        }
    >;
    cycles: Record<string, Cycle>;
}

interface FormattedKomensMessage extends KomensMessage {
    channel: string;
    _timestamp?: number;
}

interface FormattedKomens {
    [key: string]: FormattedKomensMessage;
}

export type {
    FormattedKomens,
    FormattedKomensMessage,
    FormattedMarks,
    FormattedMarksByDate,
    FormattedMarksBySubject,
    FormattedTimetable,
};
