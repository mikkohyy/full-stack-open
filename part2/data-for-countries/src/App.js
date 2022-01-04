import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  const [showDetailedInfo, setShowDetailedInfo] = useState(false)

  const detailedInfo = () => {
    if (showDetailedInfo) {
      return <CountryWithDetailedInfo country={country} />
    }
  }

  return(
    <div>
      {country.name} <button onClick={() => setShowDetailedInfo(!showDetailedInfo)}>
        {showDetailedInfo ? 'hide' : 'show'}
      </button>
      {detailedInfo()}
    </div>
  )
}

const CountrySearch = ({ value, handler }) => {
  return(
    <div>
      find countries <input value={value} onChange={handler} />
    </div>
  )
}

const ListOfCountries = ({ countries }) => {
  return(
    <div>
      {countries.map(country => <Country key={country.alpha3Code} country={country} />)}
    </div>
  )
}

const Weather = ({ city }) => {
  const [temperature, setTemperature] = useState('')
  const [weatherIcon, setWeatherIcon] = useState(false)
  const [windSpeed, setWindSpeed] = useState('')
  const [windDirection, setWindDirection] = useState('')

  const apiKey = process.env.REACT_APP_API_KEY
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        const weatherInfo = response.data
        setTemperature(weatherInfo.main.temp)
        setWeatherIcon(weatherInfo.weather[0].icon)
        setWindSpeed(weatherInfo.wind.speed)
        setWindDirection(weatherInfo.wind.deg)
      })
  }, [url])

  return(
    <div>
      <h3>Weather in {city}</h3>
      <b>temperature: </b> {temperature} Celsius
      <div>
        {weatherIcon 
          ? <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="weather icon"/>
          : false
        }
      </div>
      <b>Wind: </b> {windSpeed} m/s direction (in degrees) {windDirection}
    </div>
  )
}

const Languages = ({ languages }) => {
  return(
    <div>
      <h3>languages</h3>
      <ul>
        {languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
      </ul>
    </div>
  )
}

const Flag = ({ linkToFlag }) => {
  const flagStyle = {
    width: '10%',
    height: '10%'    
  }
  return(
    <img style={flagStyle} src={linkToFlag} alt="Flag of the country" />
  )
}



const CountryWithDetailedInfo = ({ country }) => {
  const { name, population, capital, languages, flag } = country
  return(
    <div>
      <h2>{name}</h2> 
      capital {capital}<br />
      population {population}
      <Languages languages={languages} />
      <Flag linkToFlag={flag} />
    </div>
  )
}

const Countries = ({ countries }) => {  
  if (countries.length === 1) {
    const country = countries[0]
    return(
      <div>
        <CountryWithDetailedInfo country={country} />
        <Weather city={country.capital} />
      </div>
    )
  } else if (countries.length <= 10) {
    return(
      <ListOfCountries countries={countries} />
    )
  } else {
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchField, setSearchField] = useState('')
  const [visibleCountries, setVisibleCountries] = useState([]) 

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    const searchTerm = searchField.toLowerCase()
    const filteredCountries = countries.filter(
      country => country.name.toLowerCase().includes(searchTerm)
    )
    setVisibleCountries(filteredCountries)
  }, [searchField, countries])

  const handleSearchField = (event) => {
    setSearchField(event.target.value)
  }

  return (
    <div>
      <CountrySearch value={searchField} handler={handleSearchField} />
      <Countries countries={visibleCountries} />
    </div>
  )
}

export default App