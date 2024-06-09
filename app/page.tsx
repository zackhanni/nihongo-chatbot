"use client";

import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen w-screen bg-gray-300">
      <section className="container">
        <div className="card rounded-2xl pointer-events-none border-2 bg-white">
          <div className="card-header d-flex justify-center bg-info border-bottom-0 rounded-t-2xl">
            <p className="fw-bold text-white mb-0 py-2">Live AI chat</p>
          </div>
          <div className="card-body">
            <div className="d-flex flex-row justify-content-start mb-4">
              <p className="bg-red-500 size-10 px-3 rounded-full text-white items-center justify-center flex text-bold text-xl">
                AI
              </p>
              <div className="p-3 ms-3 rounded-2xl bg-[#39c0ed33]">
                <p className="small mb-0">
                  Hello and thank you for visiting Nihongo AI Chat! Please type
                  below to begin the conversation.
                </p>
              </div>
            </div>

            <div className="d-flex flex-row justify-content-end mb-4">
              <div className="p-3 me-3 border rounded-2xl bg-[#fbfbfb;]">
                <p className="small mb-0">
                  Thank you, I really like your product.
                </p>
              </div>
              <p className="bg-blue-500 size-10 px-3 rounded-full text-white items-center justify-center flex text-bold text-xl">
                You
              </p>
            </div>

            <div
              data-mdb-input-init
              className="form-outline pointer-events-auto"
            >
              <form
                noValidate
                // ref={formRef}
                // onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="form-floating">
                  <input
                    type="message"
                    name="entry.569456943"
                    id="message"
                    className="form-control form-control-lg"
                    placeholder="Message"
                  ></input>
                  <label htmlFor="message">Message</label>
                </div>
              </form>
              {/*  */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
