"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const now = new Date();
  const hours = now.getHours();
  const greeting =
    hours >= 17 && hours < 4
      ? "こんばんは"
      : hours < 12
      ? "おはよう"
      : "こんにちは";

  const [messages, setMessages] = useState([
    {
      message: `${greeting}! and thank you for visiting Nihongo AI Chat! Please type below to begin the conversation. 以下に書いてください。`,
      sender: "ChatGPT",
    },
    // {
    //   message: ` 22222 this is the demo message representing the user. its has words like blah and testing`,
    //   sender: "user",
    // },
    // {
    //   message: `333333${greeting}! and thank you for visiting Nihongo AI Chat! Please type below to begin the conversation. 以下に書いてください。`,
    //   sender: "ChatGPT",
    // },
    // {
    //   message: `444444${greeting}! and thank you for visiting Nihongo AI Chat! Please type below to begin the conversation. 以下に書いてください。`,
    //   sender: "user",
    // },
    // {
    //   message: `555555${greeting}! and thank you for visiting Nihongo AI Chat! Please type below to begin the conversation. 以下に書いてください。`,
    //   sender: "ChatGPT",
    // },
    // {
    //   message: `666666${greeting}! and thank you for visiting Nihongo AI Chat! Please type below to begin the conversation. 以下に書いてください。`,
    //   sender: "user",
    // },
    // {
    //   message: `777777${greeting}! and thank you for visiting Nihongo AI Chat! Please type below to begin the conversation. 以下に書いてください。`,
    //   sender: "ChatGPT",
    // },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [polite, setPolite] = useState(true);
  const [showKanji, setShowKanji] = useState(false);
  const ref = useChatScroll(messages);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // console.log(api_key);
    e.preventDefault();
    setIsLoading(true);
    setShowSettings(false);
    setInputValue(""); // clear input field

    const newMessage = {
      message: inputValue,
      sender: "user",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    await processMessageToChatGPT(newMessages);
  };

  interface Message {
    sender: string;
    message: string;
  }

  async function processMessageToChatGPT(chatMessages: Message[]) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // setting the AI tone/role for responses
    const systemMessage = {
      role: "system",
      content: `You are a helpful AI designed to assist users in practicing their Japanese language skills. Engage in a ${
        polite ? "polite" : "casual"
      } conversation with short, responses in Japanese. Keep the tone friendly and encouraging. ${
        showKanji
          ? "Use simple or common kanji characters when necessary."
          : "Don't use any kanji characters."
      }`,
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        console.log(systemMessage); // is systemMessage even being used? test with french or something.
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

  // a new message scrolls the chat to the bottom
  function useChatScroll<T>(dep: T): React.MutableRefObject<HTMLDivElement> {
    const ref = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    }, [dep]);
    return ref as React.MutableRefObject<HTMLDivElement>;
  }

  return (
    <main className="">
      <section className="bg-[#bfe1b4] text-[#4b4b4b]">
        <div className="card rounded-2xl border-2 !border-[#39842a] min-h-screen max-w-screen-md mx-auto">
          <div className="card-header !bg-[#bfe1b4] !border-b-8 !border-[#39842a] rounded-t-2xl sticky top-0 w-full">
            <div className="flex justify-between items-center">
              <p className="fw-semibold mb-0 py-3">日本語 - Nihongo Chat Bot</p>
              <i // Settings Gear
                className={`bi bi-gear-fill text-2xl duration-300 ${
                  showSettings ? "rotate-90" : ""
                }`}
                onClick={() => setShowSettings(!showSettings)}
              ></i>
            </div>
            <div // Settings
              className={` ${showSettings ? "block pt-2" : "hidden"} `}
            >
              <div className="flex flex-col items-end border-t-2 border-[#39842a] py-4">
                <p className="text-lg mb-2 font-semibold">Settings</p>
                <div className="flex items-center just">
                  <p className="pr-4 mb-0">Less Kanji / More Kanji</p>
                  <i
                    className={`bi ${
                      showKanji ? "bi-toggle-on" : "bi-toggle-off"
                    } text-4xl`}
                    onClick={() => setShowKanji(!showKanji)}
                  ></i>
                </div>
                <div className="flex items-center just">
                  <p className="pr-4 mb-0">Casual / Polite</p>
                  <i
                    className={`bi ${
                      polite ? "bi-toggle-on" : "bi-toggle-off"
                    } text-4xl`}
                    onClick={() => setPolite(!polite)}
                  ></i>
                </div>
              </div>
              <div className="flex flex-col items-end border-t-2 border-[#39842a] py-4">
                <p className="text-lg mb-2 font-semibold">Having Problems?</p>
                <div className="flex items-center just">
                  <p className="">
                    Please contact Zack from{" "}
                    <a
                      href="https://www.webwizarddev.com/"
                      className="text-[#4b4b4b]"
                      target="_blank"
                    >
                      Web Wizard Dev.
                    </a>{" "}
                    Your feedback makes our apps better! Thank you.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div // Card Body
            className="card-body flex flex-col justify-between"
            ref={ref}
          >
            {/* make sure overflow is working properly. add more starter text to  default messages */}
            <div className="overflow-y-auto h-full">
              {messages.map((message) => {
                if (message.sender === "ChatGPT") {
                  return (
                    <div
                      key={message.message}
                      className="d-flex flex-row justify-content-start mb-4"
                    >
                      <p className="bg-[#ea9cd6] size-10 px-3 rounded-full text-white items-center justify-center flex text-bold text-xl">
                        AI
                      </p>
                      <div className="p-3 ms-3 rounded-2xl bg-[#e9c4e33e] border-2 border-[#ea9cd6]">
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
                      <div className="p-3 me-3 rounded-2xl bg-[#bfe1b4] border-2 border-[#39842a] ">
                        <p className="small mb-0">{message.message}</p>
                      </div>
                      <p className="bg-[#39842a] size-10 px-3 rounded-full text-white items-center justify-center flex text-bold text-xl">
                        You
                      </p>
                    </div>
                  );
                }
              })}
              {isLoading && (
                <div className="d-flex flex-row justify-content-start mb-4">
                  <p className="bg-[#ea9cd6] size-10 px-3 rounded-full text-white items-center justify-center flex text-bold text-xl">
                    AI
                  </p>
                  <div className="p-3 ms-3 rounded-2xl bg-[#e9c4e33e] #4b4b4b">
                    <p className="small mb-0">. . .</p>
                  </div>
                </div>
              )}
            </div>

            <form // form - bottom section
              noValidate
              // ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4 sticky bottom-0 bg-white"
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
                <label htmlFor="message">Type a message here</label>
                <button
                  type="submit"
                  className="btn btn-primary mt-3 py-3 uppercase !font-semibold w-full "
                  disabled={isLoading}
                >
                  Send Message
                </button>
              </div>{" "}
              <div className="w-full text-center">
                <Link
                  href={
                    "https://translate.google.com/?hl=en&sl=ja&tl=en&op=translate"
                  }
                  target="_blank"
                  className="text-center text-[#4b4b4b]"
                >
                  Google Translate{" "}
                  <i // Settings Gear
                    className="bi bi-translate text-xl"
                  ></i>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
