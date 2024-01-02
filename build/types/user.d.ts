interface User {
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
interface UserClass {
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
export { User, UserClass, EnabledModule, SettingModule, Common, ActualSemester };
