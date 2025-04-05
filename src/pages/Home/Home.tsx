import { FC, useEffect, useState } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import ForecastCard from '../../components/ForecastCard/ForecastCard'
import AIResponse from '../../components/AIResponse/AIResponse'
import styles from './Home.module.css'
import { useFetch } from '../../hooks/useFetch'

const Home: FC = () => {
  const [place, setPlace] = useState<string>("")
  const [temp, setTemp] = useState<number>(0)
  const [icon, setIcon] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [weatherData, setWeatherData] = useState<any>([])

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm)
  }

      const {data, error} = useFetch(searchTerm ? `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}` : "")

      useEffect(() => {
        if (data && data !== weatherData) {
          setTemp(Math.round(data.main.temp))
          setIcon(data.weather[0].icon)
          setPlace(data.name)
          setWeatherData(data)
        }
        console.log("data:", data)
      }, [data])

      if (error) {
        console.error("Error fetching data:", error)
      }


  return (
    <div>
      <div className={styles.placeOuterContainer}>
        {place ?
          <div className={styles.placeContainer}>
            <div className={styles.placeTempContainer}>
              <h1>{place}</h1>
              <p>{temp}°C</p>
            </div>
            <img className={styles.icon} src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather icon" />
          </div> :
          <div className={styles.placeContainer}>
            <h1>🌤️ WeatherWise</h1>
          </div>}
      </div>
      <SearchBar
        handleSearch={handleSearch}
      />
      <ForecastCard
        place={place}
      />
      {place && <AIResponse
        data={weatherData}
      />}
    </div>
  )
}

export default Home