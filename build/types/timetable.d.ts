export interface TimetableOptions {
    type?: 'permanent' | 'actual';
    date?: string;
}
export interface Timetable {
    Hours?: Array<Hour>;
    Days?: Array<Day>;
    Classes?: Record<string, TimetableClass>;
    Groups?: Record<string, Group>;
    Subjects?: Record<string, TimetableSubject>;
    Teachers?: Record<string, TimetableTeacher>;
    Rooms?: Record<string, Room>;
    Cycles?: Record<string, Cycle>;
}
export interface RawTimetable {
    Hours: Array<Hour>;
    Days: Array<Day>;
    Classes: Array<TimetableClass>;
    Groups: Array<Group>;
    Subjects: Array<TimetableSubject>;
    Teachers: Array<TimetableTeacher>;
    Rooms: Array<Room>;
    Cycles: Array<Cycle>;
}
export interface Hour {
    Id: number;
    Caption: string;
    BeginTime: string;
    EndTime: string;
}
export interface Day {
    Atoms: Array<Atom>;
    DayOfWeek: number;
    Date: string;
    DayDescription: string;
    DayType: 'WorkDay' | 'Holiday' | 'Celebration' | 'Weekend';
}
export interface Atom {
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
export interface Change {
    Day: string;
    Hours: string;
    ChangeType: 'Canceled' | 'Added' | 'Removed' | 'RoomChanged';
    Description: string;
    Time: string;
    TypeAbbrev: string;
    TypeName: string;
}
export interface Entry {
    Id: string;
    Abbrev: string;
    Name: string;
}
export interface TimetableClass extends Entry {
}
export interface Group extends Entry {
    ClassId: string;
}
export interface TimetableSubject extends Entry {
}
export interface TimetableTeacher extends Entry {
}
export interface Room extends Entry {
}
export interface Cycle extends Entry {
}
