export const convertTimestampToHours = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const timeDifference = now - date;
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    return hours;
};

export const handleTime = (hours) => {
    if (hours < 1) {
        return 'just now';
    } else
        if (hours < 24) {
            return hours + 'h';
        } else if (hours < 24 * 30) {
            return Math.floor(hours / 24) + 'd';
        }
    return Math.floor(hours / (24 * 30)) + 'm';
}