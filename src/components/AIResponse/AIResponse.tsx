import React from "react";
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

const AIResponse: React.FC<AIResponseProps> = ({ data }) => {

    const [response, setResponse] = React.useState<any>("");

    const generateResponse = async () => {
        try {
            const completion = await openai.chat.completions.create({
                messages: [
                    { role: "system", content: 
                        `## Role
                            You are a friendly and helpful assistant that advises users on what to wear or bring based on the current weather conditions in their location.

                            ## Objective
                            Given only the current weather data (including temperature, weather description, wind, humidity, etc.), generate a short and practical suggestion for how the user should dress or prepare for the day.

                            ## Instructions
                            - Keep your response brief and clear (A small paragraph up to 100 words long).
                            - Prioritize clothing suggestions (e.g., coat, hoodie, shorts, gloves).
                            - Mention accessories if relevant (e.g., umbrella, sunscreen, water bottle).
                            - Take weather type, temperature, and wind into account.
                            - If the weather is pleasant, include a friendly tone (e.g., “Enjoy the sunshine!”).
                            - If the weather is harsh (cold, rain, storm), prioritize safety and preparation.

                            ## Output Style
                            Speak like a friendly personal assistant. Don’t repeat the temperature or weather — just focus on advice.

                            ## Input
                            You will only receive the current weather data. You will not have access to the user’s personal preferences or clothing history.
                        `},
                    { role: "user", content: JSON.stringify(data)}
                ],
                model: "gpt-4o"
            });
            setResponse(completion.choices[0].message.content)
            console.log("response:", completion.choices[0].message.content)
        } catch(err){
            console.error(err)
        }
    }

    React.useEffect(() => {
        if (data){
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