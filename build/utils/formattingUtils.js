export function formatTimetable(timetable) {
    const hoursLabels = Object.values(timetable.Hours)
        .sort((a, b) => {
        const [aHour, aMinute] = a.BeginTime.split(':').map(Number);
        const [bHour, bMinute] = b.BeginTime.split(':').map(Number);
        return aHour * 60 + aMinute - (bHour * 60 + bMinute);
    })
        .reduce((acc, hour) => {
        acc[hour.Id] = hour;
        return acc;
    }, {});
    const hoursTemplate = Object.keys(hoursLabels).reduce((acc, hour) => {
        acc[hour] = null;
        return acc;
    }, {});
    const days = {};
    // Initialize days with a template
    for (let i = 1; i <= 5; i++) {
        days[i] = { ...hoursTemplate, label: i };
    }
    // Fill days with data
    Object.values(timetable.Days).forEach((day) => {
        day.Atoms.forEach((atom) => {
            days[day.DayOfWeek][atom.HourId] = {
                Subject: timetable.Subjects[atom.SubjectId]?.Abbrev,
                Teacher: timetable.Teachers[atom.TeacherId]?.Abbrev,
                Room: timetable.Rooms[atom.RoomId]?.Abbrev,
                Change: atom.Change,
            };
        });
    });
    // Remove unused hour
    const firstHourId = hoursLabels[0].Id;
    if (Object.values(days).every((day) => day[firstHourId] === null)) {
        for (const day of Object.values(days)) {
            delete day[firstHourId];
        }
    }
    return { hoursLabels, days };
}
export function formatMarks(marks) {
    // Marks grouped by Subject
    const subject = Object.values(marks.Subjects).reduce((acc, subject) => {
        const marksMap = subject.Marks.reduce((marksAcc, mark) => {
            marksAcc[mark.Id] = mark;
            return marksAcc;
        }, {});
        acc[subject.Subject.Id] = {
            Marks: marksMap,
            Subject: subject.Subject,
            AverageText: subject.AverageText,
        };
        return acc;
    }, {});
    // Marks sorted by date
    const date = Object.values(marks.Subjects)
        .flatMap((subject) => subject.Marks.map((mark) => ({
        ...mark,
        Subject: subject.Subject,
    })))
        .sort((a, b) => {
        // Convert the dates once before sorting
        const aTime = new Date(a.MarkDate).getTime();
        const bTime = new Date(b.MarkDate).getTime();
        return bTime - aTime;
    })
        .reduce((acc, mark) => {
        acc[mark.Id] = mark;
        return acc;
    }, {});
    return { subject, date };
}
export function formatKommens(general, noticeboard) {
    const reduceKommens = (kommens, channel) => {
        if (!kommens || !kommens.Messages)
            return [];
        return Object.values(kommens.Messages).map((message) => ({
            channel,
            ...message,
        }));
    };
    const formatted = [
        ...reduceKommens(noticeboard, 'noticeboard'),
        ...reduceKommens(general, 'general'),
    ];
    formatted.forEach((message) => {
        message._timestamp = new Date(message.SentDate).getTime();
    });
    return formatted
        .sort((a, b) => b._timestamp - a._timestamp)
        .reduce((acc, curr) => {
        acc[curr.Id] = curr;
        delete curr._timestamp;
        return acc;
    }, {});
}
//# sourceMappingURL=formattingUtils.js.map