export interface User {
    UserUID: string;
    CampaignCategoryCode: string;
    Class: Class;
    FullName: string;
    SchoolOrganizationName: string;
    SchoolType: string | null;
    UserType: string;
    UserTypeText: string;
    StudyYear: number;
    EnabledModules: EnabledModule[];
    SettingModules: SettingModules;
    FullUserName: string;
    Students: Student[];
}
export interface Class {
    Id: string;
    Abbrev: string;
    Name: string;
}
export interface EnabledModule {
    Module: string;
    Rights: string[];
}
export interface SettingModules {
    [key: string]: {
        $type: string;
        UploadFolderVerified?: boolean;
        ActualSemester?: {
            SemesterId: string;
            From: string;
            To: string;
        };
    };
}
export interface Student {
    FullName: string;
    Class: Class;
    SchoolType: string | null;
    StudyYear: number;
}
