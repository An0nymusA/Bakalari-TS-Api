export interface User {
    UserUID: string;
    Class: UserClass;
    FullName: string;
    SchoolOrganizationName: string;
    SchoolType: string;
    UserType: string;
    UserTypeText: string;
    StudyYear: number;
    EnabledModules: Array<EnabledModule>;
    SettingModules: SettingModule;
}

export interface UserClass {
    Id: string;
    Abbrev: string;
    Name: string;
}

export interface EnabledModule {
    Module: string;
    Rights: Array<string>;
}

export interface SettingModule {
    Common: Common;
}

export interface Common {
    $type: string;
    ActualSemester: ActualSemester;
}

export interface ActualSemester {
    SemesterId: string;
    From: string;
    To: string;
}
