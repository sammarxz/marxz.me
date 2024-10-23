const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const CITY_NAME = 'Caruaru';
const COUNTRY_CODE = 'BR';
const STATE = 'Pernambuco';

interface WeatherData {
  weather: {
    main: string;
    description: string;
  }[];
  main: {
    temp: number;
  };
  timezone: number;
}

export async function getLocalInfo() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME},${COUNTRY_CODE}&units=metric&appid=${OPENWEATHER_API_KEY}`,
      {
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data: WeatherData = await response.json();

    return {
      city: CITY_NAME,
      state: STATE,
      country: 'Brazil',
      weather: data.weather[0].main,
      weatherDescription: data.weather[0].description,
      temperature: data.main.temp,
      timezone: data.timezone
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}