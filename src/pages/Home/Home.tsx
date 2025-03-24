import React from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import ForecastCard  from '../../components/ForecastCard/ForecastCard'
import AIResponse from '../../components/AIResponse/AIResponse'
import styles from './home.module.css'

const Home: React.FC = () => {

  const [place, setPlace] = React.useState<string>("")
  const [temp, setTemp] = React.useState<number>(0)
  const [icon, setIcon] = React.useState<string>("")
  const [data, setData] = React.useState<any>([])

  const handleSearch = (searchTerm: string) => {
    fetchAPI(searchTerm)
  }

  const fetchAPI = async (searchTerm: string) => {
    try{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
      const data = await response.json()
      console.log("DATA:", data)
      console.log(Math.round(data.main.temp))
      setTemp(Math.round(data.main.temp))
      setIcon(data.weather[0].icon)
      setPlace(data.name)
      setData(data)
    } catch(err){
      console.error(err)
    }
  }

  return (
    <div>
      <div className={styles.placeOuterContainer}>
        {place && 
        <div className={styles.placeContainer}>
          <div className={styles.placeTempContainer}>
            <h1>{place}</h1>
            <p>{temp}°C</p>
          </div>
          <img className={styles.icon} src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather icon" />
        </div>}
      </div>
      <SearchBar 
        handleSearch={handleSearch}
      />
      <ForecastCard
        place={place}
      />
      {place && <AIResponse 
        data={data}
      />}
    </div>
  )
}

export default Home