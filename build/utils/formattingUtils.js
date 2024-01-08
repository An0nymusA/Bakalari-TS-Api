const trimObject = (obj, maxSize) => {
    const keys = Object.keys(obj).map(Number);
    if (keys.length > maxSize) {
        return keys.slice(0, maxSize).reduce((newObj, key) => {
            newObj[key] = obj[key];
            return newObj;
        }, {});
    }
    return obj;
};
export function formatTimetable(timetable) {
    let hoursLabels = Object.values(timetable.Hours)
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
        days[i] = {};
        days[i]['Hours'] = { ...hoursTemplate };
    }
    // Fill days with data
    Object.values(timetable.Days).forEach((day) => {
        const currentDay = days[day.DayOfWeek];
        currentDay['DayInfo'] = {
            Description: day.DayDescription,
            Date: day.Date,
            Id: day.DayOfWeek,
        };
        const hours = currentDay['Hours'];
        day.Atoms.forEach((atom) => {
            // Check if there is already an entry for the HourId, if not, initialize with an empty array
            if (!hours[atom.HourId]) {
                hours[atom.HourId] = [];
            }
            // Create a new object representing the current atom's information
            const atomInfo = {
                Subject: timetable.Subjects[atom.SubjectId]?.Abbrev,
                Teacher: timetable.Teachers[atom.TeacherId]?.Abbrev,
                Room: timetable.Rooms[atom.RoomId]?.Abbrev,
                Change: atom.Change,
                CycleIds: atom.CycleIds.reduce((acc, curr) => {
                    acc.push(timetable.Cycles[curr]?.Abbrev);
                    return acc;
                }, []),
            };
            // Push the new atom information to the list of atoms for this HourId
            hours[atom.HourId].push(atomInfo);
        });
    });
    if (Object.values(days).every((day) => Object.values(day['Hours']).every((value) => value === null)) ||
        Object.values(days).every((day) => Object.keys(day['Hours']).length == 0)) {
        hoursLabels = trimObject(hoursLabels, 9);
        for (const day of Object.values(days)) {
            day['Hours'] = trimObject(day['Hours'], 9);
        }
    }
    else {
        for (const keys of [
            Object.keys(hoursLabels),
            Object.keys(hoursLabels).reverse(),
        ]) {
            for (const hourId of keys) {
                if (Object.values(days).some((day) => day['Hours'][hourId] !== null)) {
                    break;
                }
                if (!Object.values(days).every((day) => day['Hours'][hourId] === null)) {
                    continue;
                }
                for (const day of Object.values(days)) {
                    delete day['Hours'][hourId];
                }
                delete hoursLabels[hourId];
            }
        }
    }
    return { HoursLabels: hoursLabels, Days: days, Cycles: timetable.Cycles };
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
    return { Subject: subject, Date: date };
}
export function formatKomens(general, noticeboard) {
    const reduceKomens = (komens, Channel) => {
        if (!komens || !komens.Messages)
            return [];
        return Object.values(komens.Messages).map((message) => ({
            Channel,
            ...message,
        }));
    };
    const formatted = [
        ...reduceKomens(noticeboard, 'noticeboard'),
        ...reduceKomens(general, 'general'),
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