function formatDate(date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return 'Fecha inválida';
    }

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
};

function formatTime(date) {
    if (!(dateTime instanceof Date) || isNaN(dateTime.getTime())) {
        return 'Fecha y hora inválidas';
    }

    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return dateTime.toLocaleString(undefined, options);
};

function formatDateTime(dateTime) {
    if (!(dateTime instanceof Date) || isNaN(dateTime.getTime())) {
        return 'Fecha y hora inválidas';
    }

    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    return dateTime.toLocaleString(undefined, options);
};

function dateTime(dateTime) {
    if (!(dateTime instanceof Date) || isNaN(dateTime.getTime())) {
        return 'Fecha y hora inválidas';
    }

    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    return dateTime.toLocaleString(undefined, options);
};

module.exports = {
    formatDate,
    formatTime,
    formatDateTime,
    dateTime,
};