import React from 'react'
import SearchBar from '../components/SearchBar/SearchBar'

const Home: React.FC = () => {

  const handleSearch = (searchTerm: string) => {
    console.log("Home component received search term: ", searchTerm)
  }

  return (
    <div>
      <h1>Home</h1>
      <SearchBar 
        handleSearch={handleSearch}
      />
    </div>
  )
}

export default Home