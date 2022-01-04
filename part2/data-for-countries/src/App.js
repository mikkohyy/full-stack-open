import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({ name }) => {
  return(
    <div>
      {name}
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
      {countries.map(country => <Country key={country.alpha3Code} name={country.name} />)}
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
    <img style={flagStyle} src={linkToFlag} alt="Flag of the country" width="200" height="200" />
  )
}

const CountryWithExtraInformation = ({ country }) => {
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
      <CountryWithExtraInformation country={country} />
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