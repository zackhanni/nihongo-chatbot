"use client";

import Image from "next/image";
import { useState } from "react";

const demoMessages = [
  [
    "ai",
    "Hello and thank you for visiting Nihongo AI Chat! Please type below to begin the conversation.",
  ],
  ["user", "how are you?"],
  ["ai", "Im doing fine, hbu?"],
  ["user", "deep chillin."],
];

export default function Home() {
  const [chats, setChats] = useState(demoMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setChats([...chats, ["user", inputValue]]);
    setInputValue("");
    try {
      // connect to chatGPT and get a response
      // setIsLoading(false);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <main className="flex items-center justify-center h-screen w-screen bg-gray-300">
      <section className="container">
        <div className="card rounded-2xl border-2 bg-white">
          <div className="card-header d-flex justify-center bg-info border-bottom-0 rounded-t-2xl">
            <p className="fw-bold text-white mb-0 py-2">Live AI chat</p>
          </div>
          <div className="card-body min-h-[50svh] max-h-[80svh] overflow-y-auto">
            {/* default AI chat bubble style */}
            {/* <div className="d-flex flex-row justify-content-start mb-4">
              <p className="bg-red-500 size-10 px-3 rounded-full text-white items-center justify-center flex text-bold text-xl">
                AI
              </p>
              <div className="p-3 ms-3 rounded-2xl bg-[#39c0ed33]">
                <p className="small mb-0">{chats[0][1]}</p>
              </div>
            </div> */}

            {/* default user chat bubble style */}
            {/* <div className="d-flex flex-row justify-content-end mb-4">
              <div className="p-3 me-3 border rounded-2xl bg-[#fbfbfb;]">
                <p className="small mb-0">
                  Thank you, I really like your product.
                </p>
              </div>
              <p className="bg-blue-500 size-10 px-3 rounded-full text-white items-center justify-center flex text-bold text-xl">
                You
              </p>
            </div> */}
            {/* chat from database starts here */}
            {chats.map((chat) => {
              if (chat[0] === "ai") {
                return (
                  <div
                    key={chat[1]}
                    className="d-flex flex-row justify-content-start mb-4"
                  >
                    <p className="bg-red-500 size-10 px-3 rounded-full text-white items-center justify-center flex text-bold text-xl">
                      AI
                    </p>
                    <div className="p-3 ms-3 rounded-2xl bg-[#39c0ed33]">
                      <p className="small mb-0">{chat[1]}</p>
                    </div>
                  </div>
                );
              } else if (chat[0] === "user") {
                return (
                  <div
                    key={chat[1]}
                    className="d-flex flex-row justify-content-end mb-4"
                  >
                    <div className="p-3 me-3 border rounded-2xl bg-[#fbfbfb;]">
                      <p className="small mb-0">{chat[1]}</p>
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
            {/*  */}
          </div>
        </div>
      </section>
    </main>
  );
}
