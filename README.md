# Weather Watcher

This is a web application implemented in ReactJS. The user can search a location or zipcode in order to retrieve a 5-day forecast. The weather information is fetched via AJAX requests to the [OpenWeatherMap API](https://openweathermap.org/forecast5). All temperatures are displayed in Fahrenheit.

## Known Issues

Because this app uses the free tier of the [OpenWeatherMap API](https://openweathermap.org/forecast5), it faces limitations in retrieving forecast data. Since the free tier can only retrieve 3-hour forecasts (up to 5 days, from the time of the request), the app manually calculates the day's high and low temperatures by getting the min and max of the day's 3-hour forecasts.

Moreover, all the forecasts are made in UTC/GMT+0. This can lead to having only a few forecast entries for "today" for places that are many hours behind it. For example, a forecast for Las Vegas in local time of 10 AM may only have two to three 3-hour forecast entries under the same date since UTC is 7 hours ahead of Las Vegas (PDT, GMT-7). In such a case, the temperature range may only be a few degrees.

The current implementation tests for such tight range for "today's" forecast and throws it out if the range is too small (< 6 degrees). As a result, an entry for today's forecast may not be available.
