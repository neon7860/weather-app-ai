import { FC, useState, useEffect } from 'react';
import styles from './ForecastCard.module.css';
import { useFetch } from '../../hooks/useFetch';

interface ForecastCardProps {
    place: string;
}

const ForecastCard: FC<ForecastCardProps> = ({ place }) => {
    const [forecast, setForecast] = useState<any[]>([])

    const {data, error} = useFetch(place ? `https://api.openweathermap.org/data/2.5/forecast?q=${place}&exclude=hourly,daily&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric`: "")

    useEffect(() => {
        if (data && data !== forecast) {
            const filteredData = data.list
            const dailyForecast = filteredData.filter((item: any) => item.dt_txt.includes("12:00:00"))
            const FilteredDataArr = dailyForecast.slice(0, 4)
            setForecast(FilteredDataArr)
        }
    }, [data])

    if (error) {
        console.error("Error fetching data:", error)
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