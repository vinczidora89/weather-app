# weather-app

## Project summary
This is an app that shows the current weather in a selected city, with additional details, a map with the selected location,
and the weather summary for the past 7 and next 5 days.

## Getting started
to install the project dependencies:
```sh
npm install
```
development mode:
```sh
npm run dev
```

production mode:
```sh
npm run build
```

running the unit tests:
```sh
npm run test:unit 
```

running the end-to-end tests:
```sh
npm run build
```

Demo: https://ephemeral-custard-803b78.netlify.app/

## Project information

<strong>Vue.js</strong>

The frontend is built with Vue 3 (using the Composition API and script setup), the state and actions are handled by Pinia. The components which are not immediately required are lazy-loaded with defineAsyncComponent and Suspense.

<strong>Styling</strong>

The app uses SCSS and BEM, and in the _component.scss partial there are mixins for the repeatedly used style components, like a button.

<strong>Testing</strong>

There is one unit test with Cypress Component testing, and three integration tests (for the header, the city input and the current weather) with Cypress as well.


<strong>API keys</strong>

The API keys necessary for the Google Maps and OpenWeather http requests are stored in a .env file, and there is a .env.example to display the required keys' names.

<strong>Location</strong>

When the app is opened, a default city's map and weather is displayed. This initial city can be selected by entering a “city” query parameter at the end of the url (if the entered value is not included in the cities.json list used by the app, the default city’s weather will be displayed). 

The user can submit their location data if they choose to do so (Google recommends to request user location information upon an user-initiated action, that's why they need to click a button and it's not queried automatically). If they submit their location data, it is loaded into the input field, and the weather information and map of the location is displayed. If they decline submitting their location data, their choice is saved in local storage, so on the next opening of the app there will be no request displayed.

The 'City-Input' component looks up the city options based on the input value in the cities.json npm package (the size of the json file is quite large, so that could be optimized to be changed to a backend endpoint and a http get request to get the list of cities from, to reduce the size of the vendor.js bundle). The matching cities are displayed in a list, and the user can select one. Once a city is selected (which is different from the city before) the Search button becomes active and the user can get the weather information.

<strong>Weather Information</strong>

The weather information is received from the OpenWeather API (One Call API endpoint for the current weather and forecast, and Historical Weather API for the past weather, both are in metric measurements). It is  displayed in three components: the current weather with details in a dropdown component, the weather for the next 7 days and the weather for the last 5 days. Every day’s weather has their corresponding icon displayed from  OpenWeather API (and there is a fallback icon for the time when that information is not available). 

Until the data from the API is returned, a schematic weather template is displayed as a fallback template in Suspense.
If there is an error in the request, there is an error message shown.


