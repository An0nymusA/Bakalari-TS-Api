interface TimetableOptions {
    type?: 'permanent' | 'actual';
    date?: string;
}
interface Timetable {
    Hours?: Array<Hour>;
    Days?: Array<Day>;
    Classes?: Record<string, TimetableClass>;
    Groups?: Record<string, Group>;
    Subjects?: Record<string, TimetableSubject>;
    Teachers?: Record<string, TimetableTeacher>;
    Rooms?: Record<string, Room>;
    Cycles?: Record<string, Cycle>;
}
interface RawTimetable {
    Hours: Array<Hour>;
    Days: Array<Day>;
    Classes: Array<TimetableClass>;
    Groups: Array<Group>;
    Subjects: Array<TimetableSubject>;
    Teachers: Array<TimetableTeacher>;
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
interface TimetableClass extends Entry {
}
interface Group extends Entry {
    ClassId: string;
}
interface TimetableSubject extends Entry {
}
interface TimetableTeacher extends Entry {
}
interface Room extends Entry {
}
interface Cycle extends Entry {
}
export { TimetableOptions, Timetable, RawTimetable, Hour, Day, Atom, Change, Entry, TimetableClass, Group, TimetableSubject, TimetableTeacher, Room, Cycle, };
