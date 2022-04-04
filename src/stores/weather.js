/* eslint-disable no-undef */
import { defineStore } from 'pinia';
import axios from 'axios';
import cities from 'cities.json';
import Utility from '../Utility';
import { Loader } from '@googlemaps/js-api-loader';

export const useWeatherStore = defineStore({
    id: 'weather',
    state: () => ({
        baseUrl: '//api.openweathermap.org',
        baseUrlIcons: '//openweathermap.org',
        coordinates: {
            lat: null,
            long: null
        },
        locationDataHide: false,
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
        weatherFuture: [],
        weatherPast: [],
    }),
    getters: {
        cityChanged: (state) => state.weatherCity && state.searchTerm && state.selectedCity
            && (state.selectedCity !== state.weatherCity || state.selectedCity !== state.searchTerm),
        currentIcon: (state) => state.weatherCurrent && state.weatherCurrent.weather[0].icon,
        currentSunrise: (state) => state.weatherCurrent
            && Utility.timestampToTime(state.weatherCurrent.sunrise),
        currentSunset: (state) => state.weatherCurrent
            && Utility.timestampToTime(state.weatherCurrent.sunset),
        currentTemperature: (state) => state.weatherCurrent && state.weatherCurrent.temp,
        currentWeather: (state) => state.weatherCurrent && state.weatherCurrent.weather[0],
        coordinatesFilled: (state) => state.coordinates.lat && state.coordinates.long,
        futureIcon: (state) => {
            return (index) => state.weatherFuture && state.weatherFuture[index].weather[0].icon
        },
        pastIcon: (state) => {
            return (index) => state.weatherPast && state.weatherPast[index].weather[0].icon
        },
        searchButtonDisabled: (state) => state.weatherCity && state.searchTerm && state.selectedCity
            && (state.selectedCity !== state.weatherCity && state.selectedCity === state.searchTerm),
        todaysTemperatures: (state) => state.weatherToday && state.weatherToday.temp,
    },
    actions: {
        getCityFromList(cityName) {
            let matchingCity = null;
            cities.find(city => {
                if (cityName === city.name) {
                    matchingCity = city;
                }
            });
            return matchingCity;
        },
        getWeatherByDefaultCity(cityName) {
            const matchingCity = this.getCityFromList(cityName);

            if (matchingCity) {
                this.selectedCity = matchingCity.name;
                this.searchTerm = matchingCity.name;
                this.selectedCountry = matchingCity.country;

                if (!this.coordinatesFilled) {
                    this.coordinates.lat = Number(matchingCity.lat);
                    this.coordinates.long = Number(matchingCity.lng);
                }

                this.getWeatherData();
            }
        },
        async geocodeCoordinates() {
            const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
            const currentPosition = {
                lat: this.coordinates.lat,
                lng: this.coordinates.long,
            };
            const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
            await loader.load();
            const geocoder = new google.maps.Geocoder();
            geocoder
                .geocode({ location:  currentPosition })
                .then((response) => {
                    if (response.results[0]) {
                        this.formattedAddress = response.results[0].formatted_address;
                    } else {
                        this.hasError = true
                    }
                })
                .catch(() => this.hasError = true);
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
                this.weatherFuture = response.data.daily.slice(1);
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
