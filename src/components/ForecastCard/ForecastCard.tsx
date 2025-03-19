import React from 'react';
import styles from './ForecastCard.module.css';

interface ForecastCardProps {
    place: string;
  }

const ForecastCard: React.FC<ForecastCardProps> = ({ place }) => {

    const [forecast, setForecast] = React.useState<any[]>([])

    React.useEffect(() => {
        if (place){
            fetchForecast(place)
        }
    }, [place])

    const fetchForecast = async (place: string) => {
        try{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&cnt=40&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric`)
            const data = await response.json()
            const filteredData = data.list
            const FilteredDataArr = []
            for (let i = 1; i < 5; i++) {
                FilteredDataArr.push(filteredData[i])
            }
            setForecast(FilteredDataArr)
            console.log("Filtered Data Array:", FilteredDataArr)
        } catch(err){
            console.error(err)
        }
    }


  return (
    <div className={styles.container}>
      <div className={styles.ForecastContainer}>
        {forecast.map((item, index) => (
            <div className={styles.ForecastCard} key={index}>
                <p>{item.dt_txt}</p>
                <p>{item.main.temp}°C</p>
            </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastCard;