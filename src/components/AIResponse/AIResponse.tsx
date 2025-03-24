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
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: data }
                ],
                model: "gpt-4o",
                store: true,
            });
            setResponse(completion)
            console.log("response:", completion)
        } catch(err){
            console.error(err)
        }
    }

    React.useEffect(() => {
        if (data){
            generateResponse()
        }
    }, [data])

    return (
        <div className={styles.container}>
            <div className={styles.responseContainer}>
                <h1>Generating...</h1>
            </div>
        </div>
    )
}

export default AIResponse;