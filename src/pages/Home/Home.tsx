import React from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import ForecastCard  from '../../components/ForecastCard/ForecastCard'
import styles from './home.module.css'

const Home: React.FC = () => {

  const [place, setPlace] = React.useState<string>("")
  const [temp, setTemp] = React.useState<number>(0)
  const [icon, setIcon] = React.useState<string>("")

  const handleSearch = (searchTerm: string) => {
    setPlace(searchTerm)
    fetchAPI(searchTerm)
  }

  const fetchAPI = async (searchTerm: string) => {
    try{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
      const data = await response.json()
      console.log(data.weather[0].icon)
      console.log(Math.round(data.main.temp))
      setTemp(Math.round(data.main.temp))
      setIcon(data.weather[0].icon)
    } catch(err){
      console.error(err)
    }
  }

  return (
    <div>
      <div className={styles.placeOuterContainer}>
        {place && 
        <div className={styles.placeContainer}>
          <div>
            <h1>{place}</h1>
            <p>{temp}°C</p>
          </div>
          <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather icon" />
        </div>}
      </div>
      <SearchBar 
        handleSearch={handleSearch}
      />
      <ForecastCard
        place={place}
      />
    </div>
  )
}

export default Home