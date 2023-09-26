import axios from "axios";

// Class to perform services on data requests.
const openWeatherMapApiKey = "dd1e246ac51eaa56b4c3e77198595249";

// Creating an object to store cached data and their timestamps.
const cache = {};

const fetchWeatherDataForCities = (cityCodes) => {
  const apiEndpoint = `https://api.openweathermap.org/data/2.5/group?id=${cityCodes.join(
    ","
  )}&units=metric&appid=${openWeatherMapApiKey}`;

  // Checking if data for the given cityCodes is in the cache and not expired.
  const cachedData = cache[cityCodes.join(",")];
  if (cachedData && Date.now() - cachedData.timestamp < 5 * 60 * 1000) {
    // Data is in the cache and not expired, returning it.
    return Promise.resolve(cachedData.data);
  }

  return axios
    .get(apiEndpoint)
    .then((response) => {
      const responseData = response.data;

      // Storing the data in the cache with a timestamp.
      cache[cityCodes.join(",")] = {
        data: responseData,
        timestamp: Date.now(),
      };

      return responseData;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      throw error;
    });
};

export default fetchWeatherDataForCities;
