import axios from 'axios'
import { useState, useEffect } from 'react'

const openweather_url = "https://api.openweathermap.org/data/2.5/weather"
const openweather_api_key = import.meta.env.VITE_OPENWEATHER_API_KEY

const DisplayWeather = ({ city }) => {
  const [weatherInfo, setWeatherInfo] = useState(null)  

  useEffect(() => {
    axios
    .get(`${openweather_url}?q=${city}&APPID=${openweather_api_key}`)
    .then(response => {
      setWeatherInfo(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  if (!weatherInfo) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div>
      <h1>Weather in {weatherInfo.name}</h1>
      <p>{`temprature ${weatherInfo.main.temp} Celcius`}</p>
      <img 
        src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} 
        alt={weatherInfo.weather[0].description}
        />
      <p>{`wind ${weatherInfo.wind.speed} m/s`}</p>
    </div>
  )
}

const DisplayCountries = ({ countries, search }) => {
  const renderLanguages = (langs) =>{
    const keys = Object.entries(langs).map(l => l[1])

    return (
      <ul>
        {
          keys.map(k => <li key={k}>{k}</li>)
        }
      </ul>
    )
    
  }

  if (countries.length === 1) {
    const {name, capital, area, languages, flags} = countries[0]

    return (
      <div>
        <h1>{name.common}</h1>
        <div>capital: {capital[0]}</div>
        <div>area: {area}</div>

        <h3>languages:</h3>
        {renderLanguages(languages)}

        <img className='flag' src={flags.png} alt={flags.alt} />
        <DisplayWeather city={capital[0]}/>
      </div>
    )
  }

  return (
    <>
      {
        countries.map(c => {
          return (
            <div key={c.area}>
              {c.name.common}
              <button onClick={(event) => search(event, c.name.common)}>show</button>
            </div>
          )
        })
      }
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${searchTerm}`)
      .then(response => {
          setCountries(response.data)
        })
        .catch(error => {
          console.log(error)
        })
  }, [searchTerm])

  const handleChange = (event, term=null) => {
    if (term) {
      setSearchTerm(term)
    } else {
      setSearchTerm(event.target.value)
    }
  }

  return (
    <div>
      <div>
        find countries<input value={searchTerm} onChange={handleChange} />
      </div>
      
      {(countries.length > 10) && <p>Too many matches, specify another filter</p>}
      
      {(countries.length < 10 && countries.length > 0) && 
        <DisplayCountries countries={countries} search={handleChange} />
      }
    </div>
  )
}

export default App