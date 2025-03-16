import React from 'react';
import styles from './forecastCard.module.css';

interface ForecastCardProps {
    place: (searchTerm: string) => void;
  }

const ForecastCard: React.FC<ForecastCardProps> = ({ place }) => {

    const fetchForecast = async () => {
        try{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&cnt=40&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
            const data = await response.json()
            console.log(data)
        } catch(err){
            console.error(err)
        }
    }


  return (
    <div className={styles.container}>
      <div>
        <button onClick={fetchForecast}>Fetch Forecast</button>
      </div>
    </div>
  );
}

export default ForecastCard;