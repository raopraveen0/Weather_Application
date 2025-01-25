import allApi from '../../api/allApi';
import { useState } from 'react';
import allImages from '../../assets';
import { FiSearch } from 'react-icons/fi';

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const renderWeatherImage = () => {
    if (!weather || !weather.weather || !weather.weather[0] || !weather.weather[0].main) return null;

    const weatherImages = {
      Clouds: allImages.clouds,
      Rain: allImages.rain,
      Clear: allImages.clear,
      Drizzle: allImages.drizzle,
      Mist: allImages.mist,
      Snow: allImages.snow,
    };

    const imageSrc = weatherImages[weather.weather[0].main] || null;
    return imageSrc ? (
      <img src={imageSrc} alt={weather.weather[0].main.toLowerCase()} className="w-24 h-24 mx-auto mb-4" />
    ) : <img src={allImages.humidity} alt="humidity" className="w-24 h-24 mx-auto mb-4" />;
  };

  const handleGetWeather = async () => {
    if (!city.trim()) {
      setError(new Error('Please enter a city name.'));
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await allApi.weatherApi(city);
      setWeather(data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-700 text-white">
      <div className="text-gray-800 rounded-2xl shadow-lg p-6 w-80 bg-[rgb(255,255,255)]">
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 p-2 border rounded-l-md focus:outline-none"
          />
          <button
            onClick={handleGetWeather}
            disabled={loading}
            className="bg-[rgb(0,123,255)] text-white p-2 rounded-r-md hover:bg-[rgb(0,105,217)] transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <FiSearch size={20} />
          </button>
        </div>

        {error && <p className="text-red-500 text-center">{error.message}</p>}

        {weather && (
          <div className="text-center">
            {renderWeatherImage()}
            <h2 className="text-4xl font-bold mb-2">{weather.main.temp}°C</h2>
            <p className="text-lg mb-4">{weather.name}</p>
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium">{weather.main.humidity}%</span>
                <span>Humidity</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{weather.wind.speed} km/h</span>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        )}

        {loading && <p className="text-center text-lg">Loading...</p>}
      </div>
    </div>
  );
};

export default WeatherPage;
