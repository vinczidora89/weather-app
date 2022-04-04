export default {
    getUrlParam(param, defaultValue) {
        let result = null;
        try {
            const urlParams = new URLSearchParams(window.location.search);
            result = urlParams.get(param);
        } catch {
            result = this.getUrlParamByName(param);
        }
        return result || defaultValue || '';
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
    twoDigitsWithZeroes(value) {
        return value < 9 ? `0${value}` : `${value}`;
    },
};
