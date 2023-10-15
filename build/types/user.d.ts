interface User {
    UserUID: string;
    Class: Class;
    FullName: string;
    SchoolOrganizationName: string;
    SchoolType: string;
    UserType: string;
    UserTypeText: string;
    StudyYear: number;
    EnabledModules: Array<EnabledModule>;
    SettingModules: SettingModule;
}
interface Class {
    Id: string;
    Abbrev: string;
    Name: string;
}
interface EnabledModule {
    Module: string;
    Rights: Array<string>;
}
interface SettingModule {
    Common: Common;
}
interface Common {
    $type: string;
    ActualSemester: ActualSemester;
}
interface ActualSemester {
    SemesterId: string;
    From: string;
    To: string;
}
export { User, Class, EnabledModule, SettingModule, Common, ActualSemester };
