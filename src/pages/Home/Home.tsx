import React from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import styles from './home.module.css'

const Home: React.FC = () => {

  const [place, setPlace] = React.useState<string>("")
  const [temp, setTemp] = React.useState<number>(0)

  const handleSearch = (searchTerm: string) => {
    setPlace(searchTerm)
    fetchAPI(searchTerm)
  }

  const fetchAPI = async (searchTerm: string) => {
    try{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
      const data = await response.json()
      console.log(data)
      console.log(Math.round(data.main.temp))
      setTemp(Math.round(data.main.temp))
    } catch(err){
      console.error(err)
    }
  }

  return (
    <div>
      <div className={styles.placeOuterContainer}>
        {place && 
        <div className={styles.placeContainer}>
          <h1>{place}</h1>
          <p>{temp}°C</p>
        </div>}
      </div>
      <SearchBar 
        handleSearch={handleSearch}
      />
    </div>
  )
}

export default Home