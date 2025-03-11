import React from 'react'
import SearchBar from '../components/SearchBar/SearchBar'

const Home: React.FC = () => {

  const [city, setCity] = React.useState<string>("")

  const handleSearch = (searchTerm: string) => {
    setCity(searchTerm)
    fetchAPI(searchTerm)
  }

  const fetchAPI = async (searchTerm: string) => {
    try{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
      const data = await response.json()
      console.log(data)
    } catch(err){
      console.error(err)
    }
  }

  return (
    <div>
      {city && <h1>{city}</h1>}
      <SearchBar 
        handleSearch={handleSearch}
      />
    </div>
  )
}

export default Home