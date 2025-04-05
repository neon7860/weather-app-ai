import { FC, useState, useEffect, useRef } from "react";
import styles from "./AIResponse.module.css";
import OpenAI from "openai";

interface AIResponseProps {
    data: any;
}

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
if (!apiKey) {
    throw new Error("VITE_OPENAI_API_KEY is not defined in the environment variables.");
}
const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

const AIResponse: FC<AIResponseProps> = ({ data }) => {
    const [response, setResponse] = useState<any>("");
    const prevData = useRef<any>(null);

    const generateResponse = async () => {
        try {
            const completion = await openai.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: `
                            ## Role
                            You are a warm, helpful assistant that gives users practical clothing and preparation advice based on the current weather.

                            ## Objective
                            Given only the current weather data (temperature, weather description, wind speed, humidity, etc.), provide a short, useful suggestion to help the user dress appropriately and prepare for the day.

                            ## Instructions
                            - Keep the response short, friendly, and easy to read (max ~100 words).
                            - Prioritize clothing suggestions (e.g., jacket, hoodie, shorts, gloves).
                            - Mention helpful accessories (e.g., umbrella, sunscreen, water bottle) if relevant.
                            - Consider temperature, weather conditions (e.g., rain, sun, snow), and wind.
                            - If the weather is mild or pleasant, include a cheerful touch (e.g., "Enjoy your day!").
                            - If the weather is harsh or dangerous, prioritize safety and preparation (e.g., "Stay warm and drive carefully").

                            ## Output Style
                            Speak like a friendly personal assistant. Focus only on helpful suggestions — do not repeat weather data like temperature or conditions.

                            ## Input
                            You will only receive raw current weather data. You won’t have access to the user’s preferences or clothing history.
                        `,
                    },
                    { role: "user", content: JSON.stringify(data) }
                ],
                model: "gpt-4o"
            });
            setResponse(completion.choices[0].message.content);
            console.log("response:", completion.choices[0].message.content);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (data && data !== prevData.current) {
            prevData.current = data;
            setResponse("")
            generateResponse()
        }
    }, [data])

    return (
        <div className={styles.container}>
            <div className={styles.responseContainer}>
                <p className={styles.response}>{!response ? "Generating..." : response}</p>
            </div>
        </div>
    )
}

export default AIResponse;