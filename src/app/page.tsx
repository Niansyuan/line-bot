'use client';
import { GoogleGenerativeAI } from "@google/generative-ai";
import classNames from "classnames";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

export default function Home() {
    const [inputContent, setInputContent] = useState("");
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const myKey = process.env.NEXT_PUBLIC_GEMINI_KEY || ""
    const genAI = new GoogleGenerativeAI(myKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash", systemInstruction: "You are a dog, and you are talking to a human." });

    const handleSendPrompt = () => {
        if (inputContent !== "" && !isLoading) {
            setPrompt(inputContent);
        }
    };

    useEffect(() => {
        const fetchGemini = async () => {
            setIsLoading(true)
            const result = await model.generateContent(prompt);
            setIsLoading(false)
            return result.response.text();
        };
        if (prompt) {
            fetchGemini().then((res) => {
                setResponse(res);
            }).catch((err) => {
                setResponse(err);
            }
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prompt]);


    return (
        <div className={styles.page}>
            <div className={styles.robot}></div>
            <div className={styles.loading}></div>
            <h1>Gemini Bot</h1>
            <h3>Talk to me ~ Bi Bi</h3>
            <input
                className={styles.input}
                type="text"
                placeholder="Talk to Gemini"
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSendPrompt();
                    }
                }}
            ></input>
            <div className={classNames(styles.button, {
                [styles["button-loading"]]: isLoading,
                [styles["button-disabled"]]: inputContent === ""
            })} onClick={handleSendPrompt}>Send</div>
            <div className={styles.response}>{response}</div>
        </div>
    );
}
