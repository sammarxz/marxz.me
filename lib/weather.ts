const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const CITY_NAME = 'Caruaru';
const COUNTRY_CODE = 'BR';
const STATE = 'Pernambuco';

// Mapeamento de condições climáticas para português
const weatherTranslations: { [key: string]: string } = {
  'Clear': 'Limpo',
  'Clouds': 'Nublado',
  'Rain': 'Chuvoso',
  'Drizzle': 'Chuvisco',
  'Thunderstorm': 'Tempestade',
  'Snow': 'Neve',
  'Mist': 'Névoa',
  'Smoke': 'Fumaça',
  'Haze': 'Neblina',
  'Dust': 'Poeira',
  'Fog': 'Nevoeiro',
  'Sand': 'Areia',
  'Ash': 'Cinzas',
  'Squall': 'Rajada',
  'Tornado': 'Tornado'
};

const weatherDescriptionTranslations: { [key: string]: string } = {
  'clear sky': 'céu limpo',
  'few clouds': 'poucas nuvens',
  'scattered clouds': 'nuvens dispersas',
  'broken clouds': 'nuvens quebradas',
  'overcast clouds': 'nublado',
  'light rain': 'chuva leve',
  'moderate rain': 'chuva moderada',
  'heavy rain': 'chuva forte',
  'light intensity drizzle': 'chuvisco leve',
  'drizzle': 'chuvisco',
  'heavy intensity drizzle': 'chuvisco forte',
  'thunderstorm': 'tempestade',
  'light thunderstorm': 'tempestade leve',
  'heavy thunderstorm': 'tempestade forte',
  'mist': 'névoa',
  'fog': 'nevoeiro'
};

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
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME},${COUNTRY_CODE}&units=metric&lang=pt_br&appid=${OPENWEATHER_API_KEY}`,
      {
        next: { revalidate: 300 } // Cache por 5 minutos
      }
    );

    if (!response.ok) {
      throw new Error('Falha ao buscar dados do clima');
    }

    const data: WeatherData = await response.json();

    // Traduz a condição climática principal
    const weatherMain = weatherTranslations[data.weather[0].main] || data.weather[0].main;
    
    // Traduz a descrição detalhada
    const weatherDesc = weatherDescriptionTranslations[data.weather[0].description.toLowerCase()] 
      || data.weather[0].description;

    return {
      cidade: CITY_NAME,
      estado: STATE,
      pais: 'Brasil',
      clima: weatherMain,
      descricaoClima: weatherDesc,
      temperatura: data.main.temp,
      fusoHorario: data.timezone,
      // Formatação amigável da temperatura
      temperaturaFormatada: `${Math.round(data.main.temp)}°C`
    };
  } catch (error) {
    console.error('Erro ao buscar dados do clima:', error);
    return null;
  }
}