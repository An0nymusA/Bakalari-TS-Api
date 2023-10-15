interface TimetableOptions {
    type?: 'permanent' | 'actual';
    date?: string;
}

interface Timetable {
    Hours?: Array<Hour>;
    Days?: Array<Day>;
    Classes?: Record<string, Class>;
    Groups?: Record<string, Group>;
    Subjects?: Record<string, Subject>;
    Teachers?: Record<string, Teacher>;
    Rooms?: Record<string, Room>;
    Cycles?: Record<string, Cycle>;
}

interface RawTimetable {
    Hours: Array<Hour>;
    Days: Array<Day>;
    Classes: Array<Class>;
    Groups: Array<Group>;
    Subjects: Array<Subject>;
    Teachers: Array<Teacher>;
    Rooms: Array<Room>;
    Cycles: Array<Cycle>;
}

interface Hour {
    Id: number;
    Caption: string;
    BeginTime: string;
    EndTime: string;
}

interface Day {
    Atoms: Array<Atom>;
    DayOfWeek: number;
    Date: string;
    DayDescription: string;
    DayType: 'WorkDay' | 'Holiday' | 'Celebration' | 'Weekend';
}

interface Atom {
    HourId: number;
    GroupIds: Array<string>;
    SubjectId: string | null;
    TeacherId: string | null;
    RoomId: string | null;
    CycleIds: Array<string>;
    Change: Change;
    HomeworkIds: Array<string>;
    Theme: string | null;
}

interface Change {
    Day: string;
    Hours: string;
    ChangeType: 'Canceled' | 'Added' | 'Removed' | 'RoomChanged';
    Description: string;
    Time: string;
    TypeAbbrev: string;
    TypeName: string;
}

interface Entry {
    Id: string;
    Abbrev: string;
    Name: string;
}

interface Class extends Entry {}

interface Group extends Entry {
    ClassId: string;
}

interface Subject extends Entry {}

interface Teacher extends Entry {}

interface Room extends Entry {}

interface Cycle extends Entry {}

export {
    TimetableOptions,
    Timetable,
    RawTimetable,
    Hour,
    Day,
    Atom,
    Change,
    Entry,
    Class,
    Group,
    Subject,
    Teacher,
    Room,
    Cycle,
};
