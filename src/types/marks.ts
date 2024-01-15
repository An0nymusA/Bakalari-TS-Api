export interface Marks {
    Subjects: Array<SubjectMarks>;
    MarkOptions: Record<string, MarkOption>;
}

export interface SubjectMarks {
    Marks: Array<Mark>;
    Subject: MarkSubject;
    AverageText: string;
    TemporaryMark: string;
    SubjectNote: string;
    TemporaryMarkNote: string;
    PointsOnly: boolean;
    MarkPredictionEnabled: boolean;
}

export interface Mark {
    MarkDate: string;
    EditDate: string;
    Caption: string;
    Theme: string;
    MarkText: string;
    IsInvalidDate: boolean;
    TeacherId: string;
    Type: string;
    TypeNote: string;
    Weight: number;
    SubjectId: string;
    IsNew: boolean;
    IsPoints: boolean;
    CalculatedMarkText: string;
    ClassRankText: string;
    Id: string;
    PointsText: string;
    MaxPoints: number;
}

export interface MarkSubject {
    Id: string;
    Abbrev: string;
    Name: string;
}

export interface MarkOption {
    Id: string;
    Abbrev: string;
    Name: string;
}
