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
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&exclude=hourly,daily&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric`)
            const data = await response.json()
            const filteredData = data.list
            const dailyForecast = filteredData.filter((item: any) => item.dt_txt.includes("12:00:00"))
            const FilteredDataArr = dailyForecast.slice(0, 4)
            setForecast(FilteredDataArr)
            console.log("new filtered data:", FilteredDataArr)
        } catch(err){
            console.error(err)
        }
    }


  return (
    <div className={styles.container}>
      <div className={styles.ForecastContainer}>
        {forecast.map((item, index) => {
          // Format the date and time
          const date = new Date(item.dt_txt);
          const formattedDate = date.toLocaleDateString(undefined, {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
          });
          const formattedTime = date.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div className={styles.ForecastCard} key={index}>
              <p className={styles.date}>{formattedDate}</p>
              <p className={styles.time}>{formattedTime}</p>
              <img className={styles.icon} src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt="weather icon" />
              <p className={styles.temp}>{item.main.temp}°C</p>
              <p className={styles.description}>{item.weather[0].description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ForecastCard;