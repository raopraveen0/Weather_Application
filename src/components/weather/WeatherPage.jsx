import allApi from '../../api/allApi';
import { useState } from 'react';
const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-blue-100'>
      <h1 className='text-4xl font-bold mb-8'>Weather Page</h1>
      <div className='flex flex-col items-center'>
        <input
          type='text'
          placeholder='Enter city name'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className='p-2 border border-gray-300 rounded mb-4 w-64'
        />
        <button
          onClick={async () => {
            setLoading(true);
            try {
              const data = await allApi.weatherApi(city);
              setWeather(data);
            } catch (error) {
              setError(error);
            }
            setLoading(false);
          }}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300'
        >
          Get Weather
        </button>
      </div>
      {loading && <p className='mt-4 text-lg'>Loading...</p>}
      {error && <p className='mt-4 text-red-500'>{error.message}</p>}
      {weather && (
        <div className='mt-8 p-4 bg-white rounded shadow-md'>
          <h2 className='text-2xl font-bold'>{weather.name}</h2>
          <p className='text-lg'>{weather.main.temp}°C</p>
        </div>
      )}
    </div>
  )
}

export default WeatherPage