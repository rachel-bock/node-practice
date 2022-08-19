# Weather API

This repo includes an Express server that fetches weather information from the OpenWeatherMap.org API and reformats it into a summary object that can then be used for front-end presentation.

The endpoint is located at http://localhost:3001/local/{zipcode}.  This will create an object that returns the following information:
- City Name
- Conditions
- High Temp
- Low Temp

## Challenges & Improvements

- The biggest challenge in preparing this API was that the weather information was based on the latitude and longitude of a location rather than the zip code. Being since the input from the user was provided in the form of a zip code, I needed to fetch the latitude and longitude information of that zip code before I could fetch the weather information.
- An improvement that I'd like to make is to validate the user input.  Right now, I only check for a 5-character length string.  I would also like to check that the characters follow the format XXXXX where X represents a number from 0 to 9.  In this validation, I would use a regular expression to check the contents of the string.  I could use Joi to validate the input.

## Wins
 - There is an error message returned if the length of the string is not 5 characters.
 - Getting the app listening. :) 
 - Using the type property in the package.json file to work with modules so that I could use more current import syntax rather than the require syntax.
 - Creating a nested fetch call using the results of the first fetch as parameters of the second fetch.  Because of the way I set up the return from the first fetch call, I could use it as an object being passed into my second fetch call to interpolate the url for the second fetch call.  Personally, I think that was pretty slick.  :)
 - Getting testing working using ```npm test```.

## Contributor
[Rachel Bock](https://www.linkedin.com/in/rachelbock)