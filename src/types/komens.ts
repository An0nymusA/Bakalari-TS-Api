interface KomensOptions {
    noticeboard: boolean;
}

interface Komens {
    Messages: KomensMessage[];
}

interface KomensMessage {
    $type: string;
    Id: string;
    Title: string;
    Text: string;
    SentDate: string;
    Sender: Sender;
    Attachments: AttachmentInfo[];
    Read: boolean;
    LifeTime: string;
    DateFrom: null;
    DateTo: null;
    Confirmed: boolean;
    CanConfirm: boolean;
    Type: string;
    CanAnswer: boolean;
    Hidden: boolean;
    CanHide: boolean;
    CanDelete: boolean;
    RelevantName: string;
    RelevantPersonType: string;
}

interface Sender {
    $type: string;
    Id: string;
    Type: string;
    Name: string;
}

interface AttachmentInfo {
    $type: string;
    Id: string;
    Name: string;
    Type: string;
    Size: number;
}

export { Komens, KomensMessage, KomensOptions, Sender, AttachmentInfo };
