interface Subjects {
    Subjects: Array<Subject>;
}

interface Subject {
    SubjectID: string;
    SubjectName: string;
    SubjectAbbrev: string;
    TeacherID: string;
    TeacherName: string;
    TeacherAbbrev: string;
    TeacherEmail: string;
    TeacherWeb: string;
    TeacherSchoolPhone: string;
    TeacherHomePhone: string;
    TeacherMobilePhone: string;
}

export { Subjects, Subject };
