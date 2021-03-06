# Week6_Weather_Dashboard

## Description

This Web site provides current weather and 5 days forecast for the city that a user searches/selects.

- Use Bootstrap for UI configuration
- Use JavaScript to add functionallities and handle elements
- Use Moment.js to get the date information
- Use localStorage to keep search history
- Use fetch() to fetch data from the server
    - Use the Geocoding API (https://openweathermap.org/api/geocoding-api) to get lat and lon information that matches to the city name a user searches or selects
    - Use the One Call API (https://openweathermap.org/api/one-call-api) to retrieve weather data
    - Use the URL (http://openweathermap.org/img/wn/{icon}@2x.png) to get weather icon image file (Refer to https://openweathermap.org/weather-conditions#How-to-get-icon-URL)

## Web Site's URL

- Weather Dashboard : 
https://wonjong2.github.io/Week6_Weather_Dashboard/

## Git Hub URL for this Web Site
- wonjong2/Week5_Work_Day_Scheduler : https://github.com/wonjong2/Week6_Weather_Dashboard

## Usage

- When a user opens this web site, it shows the first screen including the search form for city and empty weather blocks
- When a user clicks 'Search' button with a city name in input field, it starts retriving the weather data for that city 
    - A searched city name is added to the search history
    - The search history will be maintained even though the browser refreshes/restarts
- It shows current weather and 5 days forecast
    - Current Weather includes :
        * Date : Month/Day/Year
        * Weather Icon, Temp(°F), Wind(MPH), Humidity(%)
        * And UV Index with matched color (Refer to https://www.who.int/uv/publications/en/UVIGuide.pdf)        
          - Green : No Protection Required
          - Yellow and Orange : Protection Required
          - Red and Violet : Extra Proection Required
    - 5 Days forecast includes
        * Date : Month/Day/Year
        * Weather Icon, Temp(°F), Wind(MPH), Humidity(%)
- When a user clicks one of the cities in the search history, it shows current weather and 5 days forecast for that city

- __Simple Demo__ : https://watch.screencastify.com/v/q8SSCtv0sS3xjGt8idvM

Please see the screenshots on this Website.

- First Screen
![first-screen](/assets/images/firstscreen.png)

- Search Result with valid city name
![valid-city-result](/assets/images/SearchResult.png)

- Search Result with invalid city name
![invalid-city-result](/assets/images/invalidcityname.png)

- Select the city in the search hitory
![select-one-in-search-history](/assets/images/selecthistory.png)

## License

MIT License

Copyright (c) [2022] [Wonjong Park]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
