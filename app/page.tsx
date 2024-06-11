"use client";

import Image from "next/image";
import { useState } from "react";

// const api_key = process.env.API_KEY;
const api_key = "";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      message:
        "Hello and thank you for visiting Nihongo AI Chat! Please type below to begin the conversation.",
      sender: "ChatGPT",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(api_key);
    e.preventDefault();
    setIsLoading(true);
    setInputValue(""); // clear input field

    const newMessage = {
      message: inputValue,
      sender: "user",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: "system",
      content:
        "You are a helpful AI designed to assist users in practicing their Japanese language skills. Engage in a conversation with short, 1 to 2 sentence responses in Japanese. Make sure to correct any mistakes politely and provide the correct way to say things if necessary. Keep the tone friendly and encouraging.",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + api_key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsLoading(false);
      });
  }

  return (
    <main className="flex items-center justify-center h-screen w-screen bg-gray-300">
      <section className="container">
        <div className="card rounded-2xl border-2 bg-white">
          <div className="card-header d-flex justify-center bg-info border-bottom-0 rounded-t-2xl">
            <p className="fw-bold text-white mb-0 py-2">Nihongo Chat Bot</p>
          </div>
          <div className="card-body min-h-[50svh] max-h-[80svh] overflow-y-auto flex flex-col justify-between">
            {messages.map((message) => {
              if (message.sender === "ChatGPT") {
                return (
                  <div
                    key={message.message}
                    className="d-flex flex-row justify-content-start mb-4"
                  >
                    <p className="bg-red-500 size-10 px-3 rounded-full text-white items-center justify-center flex text-bold text-xl">
                      AI
                    </p>
                    <div className="p-3 ms-3 rounded-2xl bg-[#39c0ed33]">
                      <p className="small mb-0">{message.message}</p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    key={message.message}
                    className="d-flex flex-row justify-content-end mb-4"
                  >
                    <div className="p-3 me-3 border rounded-2xl bg-[#fbfbfb;]">
                      <p className="small mb-0">{message.message}</p>
                    </div>
                    <p className="bg-blue-500 size-10 px-3 rounded-full text-white items-center justify-center flex text-bold text-xl">
                      You
                    </p>
                  </div>
                );
              }
            })}
            {isLoading && (
              <div className="d-flex flex-row justify-content-start mb-4">
                <p className="bg-red-500 size-10 px-3 rounded-full text-white items-center justify-center flex text-bold text-xl">
                  AI
                </p>
                <div className="p-3 ms-3 rounded-2xl bg-[#39c0ed33]">
                  <p className="small mb-0">. . .</p>
                </div>
              </div>
            )}
            <form
              noValidate
              // ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="form-floating">
                <input
                  type="message"
                  name="message"
                  id="message"
                  className="form-control form-control-lg"
                  placeholder="Message"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                ></input>
                <label htmlFor="message">Message</label>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
