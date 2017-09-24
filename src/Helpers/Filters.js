const DateTimeFilter = (dateTime, timeEnabled) => {
    const addZero = (value) => {
        return (value < 10) ? '0' + value : value;
    }

    const date = new Date(dateTime);
    const Year = date.getFullYear();
    const Month = date.getMonth() + 1;
    const Day = date.getDate();
    const Hour = date.getHours();
    const Minutes = date.getMinutes();

    const datetime = addZero(Day) + '/' + addZero(Month) + '/' + Year + ' @ ' + addZero(Hour) + ':' + addZero(Minutes);
    const dateOnly = addZero(Day) + '/' + addZero(Month) + '/' + Year;

    return (timeEnabled) ? datetime : dateOnly;
}

export { DateTimeFilter };