import Image from 'next/image'
import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios';

export default function Home() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState()
  const [error, setError] = useState(null);

  const searchWeather = async () => {

    console.log('request')
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}`
      let apiKey = '322c1a52e22b4ac0a06450d42b4044bd'

      const res = await axios.get(url, { params: { appid: apiKey } });
      setError(null);
      setWeatherData(res.data)
    }
    catch (error) {

      setError("City not found, Please enter a valid city name");
      // setError(error.response.data.message);
    }
    // convert Kelvin to Celsius, take your kelvin temp and subtract it from 273.15
    // console.log(res.data.main.temp - 273.15)
  }

  return <>

    <Head>
      <title>Weather App by Afaq</title>
      {weatherData?.weather && <link rel="shortcut icon" href={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} />}

    </Head>
    {console.log('weatherData', weatherData)}

    <div className='flex justify-center py-10 px-32 bg-gray-50 font-serif'>
      <div>
        <h1 className='text-2xl '>Search Weather By City Name</h1>
        <p className={`text-red-500 bg-red-200 rounded-xl px-[8px] py-[3px] inline-block text-md mt-3 w-full text-center ${error ? 'visible' : 'invisible'}`} >{error}</p>
        <div className="flex">

          <input
            type="text"
            className="block w-80 px-4 py-2 text-purple-700 bg-white border rounded-full focus:ring-purple-200 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Search..."
            onChange={(e) => {
              setCity(e.target.value)
            }}

          />
          <button className={`py-2 px-4 ml-[10px] float-right text-white bg-purple-500 rounded-full ${city === '' ? 'bg-purple-300' : 'hover:bg-purple-700 cursor-pointer'} `}
            // disabled={city === '' ? true : ''}
            onClick={searchWeather}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

    </div>

    <div className='bg-gray-50 min-h-screen px-32'>

      {!weatherData ? <h1 className='text-gray-200 text-5xl font-serif'>Weather data will be shown here</h1> : ''}

      {weatherData?.weatherData && <div className="w-80 bg-gray-50 min-h-screen w-full px-32" >
        <h1 className='text-xl font-serif text-gray-600'>Description: {weatherData.weather[0].description}</h1>
        <img className='float-right w-[100px]' src={'http://openweathermap.org/img/w/' + weatherData.weather[0].icon + '.png'} />
        <h1 className='text-xl font-serif text-gray-600 py-2'>Temperature: {weatherData.main.temp}</h1>
        <h1 className='text-xl font-serif text-gray-600 py-2'>Minimum Temperature: {weatherData.main.temp_min}</h1>
        <h1 className='text-xl font-serif text-gray-600 py-2'>Maximum Temperature: {weatherData.main.temp_max}</h1>
        <h1 className='text-xl font-serif text-gray-600 py-2'>Humidity: {weatherData.main.humidity}</h1>
        <h1 className='text-xl font-serif text-gray-600 py-2'>Sunrise: {weatherData.sys.sunrise}</h1>
        <h1 className='text-xl font-serif text-gray-600 py-2'>Sunset: {weatherData.sys.sunset}</h1>
        <h1 className='text-xl font-serif text-gray-600 py-2'>Country: {weatherData.sys.country}</h1>
      </div>}

    </div>

  </>

}
