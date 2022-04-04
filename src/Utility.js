export default {
    twoDigitsWithZeroes(value) {
        return value < 9 ? `0${value}` : `${value}`;
    },
    timestampToDate(value) {
        const date = new Date(value * 1000);
        const days = date.getDate();
        const months = date.toLocaleString('default', { month: 'long' });
        return `${this.twoDigitsWithZeroes(days)} ${months}`;
    },
    timestampToTime(value) {
        const date = new Date(value * 1000);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${this.twoDigitsWithZeroes(hours)}:${this.twoDigitsWithZeroes(minutes)}`;
    },
};
