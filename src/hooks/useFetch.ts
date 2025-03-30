import React from "react";

export const useFetch = (url: string) => {

    const [data, setData] = React.useState<any>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchData = async () => {
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
