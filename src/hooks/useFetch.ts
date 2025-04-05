import { useState, useEffect } from "react";

export const useFetch = (url: string) => {

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!url) {
                setLoading(false);
                return;
            }
            try{
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json()
                setData(data)
                setLoading(false)
            }catch(err){
                console.error(err)
                setError("Failed to fetch data")
                setLoading(false)
            }
        }
        fetchData()
    }, [url])
    return {data, loading, error}
}
