import { defineStore } from 'pinia';
import axios from "axios";
import Utility from '../Utility';

export const useWeatherStore = defineStore({
    id: 'weather',
    state: () => ({
        baseUrl: 'http://api.openweathermap.org',
        coordinates: {
            lat: null,
            long: null
        },
        errorType: null,
        formattedAddress: null,
        isLoading: false,
        locationSupportStatus: null,
        hasError: false,
        searchTerm: null,
        selectedCity: null,
        selectedCountry: null,
        weatherCity: null,
        weatherCountry: null,
        weatherCurrent: null,
        weatherToday: null,
        weatherForecast: [],
        weatherPast: [],
    }),
    getters: {
        cityChanged: (state) => state.weatherCity && state.searchTerm && state.selectedCity
            && (state.selectedCity !== state.weatherCity || state.selectedCity !== state.searchTerm),
        currentIcon: (state) => state.weatherCurrent && state.weatherCurrent.weather[0].icon,
        forecastIcon: (state) => {
            return (index) => state.weatherForecast && state.weatherForecast[index].weather[0].icon
        },
        pastIcon: (state) => {
            return (index) => state.weatherPast && state.weatherPast[index].weather[0].icon
        },
        currentSunrise: (state) => state.weatherCurrent
            && Utility.timestampToTime(state.weatherCurrent.sunrise),
        currentSunset: (state) => state.weatherCurrent
            && Utility.timestampToTime(state.weatherCurrent.sunset),
        currentWeather: (state) => state.weatherCurrent && state.weatherCurrent.weather[0],
        todaysTemperatures: (state) => state.weatherToday && state.weatherToday.temp,
    },
    actions: {
        setCoordinates(value) {
            this.coordinates.lat = value.lat;
            this.coordinates.long = value.long;
        },
        async checkForLocationPermission() {
            const response = await navigator.permissions.query({ name: 'geolocation' });
            this.locationSupportStatus = response.state;
        },
        async getWeatherData() {
            this.isLoading = true;
            try {
                this.getWeather({ lat: this.coordinates.lat, lon: this.coordinates.long });
                for (let i = 1; i < 6; i += 1) {
                    this.getPastWeather({ daysBefore: i, lat: this.coordinates.lat, lon: this.coordinates.long });
                }
            }
            catch {
                this.hasError = true;
            }
            finally {
                this.weatherCity = this.selectedCity;
                this.weatherCountry = this.selectedCountry;
                this.isLoading = false;
            }

        },
        async getWeather(data) {
            const key = import.meta.env.VITE_OPENWEATHER_KEY;
            const weatherUrl = `${this.baseUrl}/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${key}`;
            try {
                const response = await axios.get(weatherUrl);
                this.hasError = false;
                this.weatherCurrent = response.data.current;
                this.weatherToday = response.data.daily[0];
                this.weatherForecast = response.data.daily.slice(1);
            }
            catch (error) {
                this.hasError = true;
            }
        },
        async getPastWeather(data) {
            const key = import.meta.env.VITE_OPENWEATHER_KEY;
            const yesterday = Math.round((Date.now() - 86400000 * data.daysBefore) / 1000);
            const pastWeatherUrl = `${this.baseUrl}/data/2.5/onecall/timemachine?lat=${data.lat}&lon=${data.lon}&dt=${yesterday}&units=metric&appid=${key}`;
            this.weatherPast = [];
            try {
                const response = await axios.get(pastWeatherUrl);
                this.hasError = false;
                this.weatherPast.push(response.data.current);
                if (this.weatherPast.length === 5) {
                    this.weatherPast.sort((a, b) => {
                        return a.dt - b.dt;
                    })
                }
            }
            catch (error) {
                this.hasError = true;
            }
        },
    }
});
