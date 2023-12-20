import React, { useEffect, useRef, useState } from "react";
import conf from "../conf/conf";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { IoSend } from "react-icons/io5";
import { FaLocationPin } from "react-icons/fa6";
import "./style.css";
import logo from "../image/umbrion.png";
import user from "../image/user.jpg";
import { FadeLoader, RingLoader } from "react-spinners";

const Chat = () => {
  const genAI = new GoogleGenerativeAI(conf.apikey);

  const [input, setInput] = useState("");
  const [allResults, setAllresults] = useState([]);
  const [history, setHistory] = useState([]);
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const chat = model.startChat({
        history: history,
      });

      const result = await chat.sendMessage(input);
      const response = await result.response;
      const text = await response.text();
      // Within your JSX code, where you're rendering the response:
      const highlightedResponse = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

      console.log(text);
      setHistory((prev) => [
        ...prev,
        { role: "model", parts: highlightedResponse },
      ]);
      setAllresults((prevResults) => [
        ...prevResults,
        { role: "model", parts: highlightedResponse },
      ]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }
  const handleSubmit = () => {
    if (input.trim() !== "") {
      setAllresults((prevResults) => [
        ...prevResults,
        { role: "user", parts: input },
      ]);
      setHistory((prev) => [...prev, { role: "user", parts: input }]);
      run();

      setInput("");
    }
  };
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    handleSubmit();
  }, [allResults]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <>
      <div className="flex flex-col w-full h-full bg-[#343541]">
        <div className=" flex w-full h-20 justify-start items-center bg-[#502464]">
          <div className=" flex items-center ml-20 text-white text-2xl font-bold gap-3">
            <div>EVEE GPT</div>
            <div>
              <img src={logo} alt="" width={40} height={40} className="" />
            </div>
          </div>
        </div>
        <div className="w-screen h-screen px-20 ">
          <div className=" flex flex-col w-full h-full gap-5 mt-10">
            <div>
              <div
                className=" bgstyle py-2 scroll-container w-[60%] h-custom  border-[#502464] border-2 rounded-lg border-opacity-30 overflow-x-hidden overflow-y-scroll scroll-smooth bg-cover bg-center transfrom delay-1000"
                ref={chatContainerRef}
              >
                {allResults.map((item, index) => (
                  <>
                    <div
                      className={`py-4 px-10 flex transition-transform duration-1000 ease-in-out ${
                        item.role === "user" ? " flex-row-reverse " : ""
                      }`}
                      key={index}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex justify-center items-center overflow-hidden ${
                          item.role === "user"
                            ? "bg-[#E8E8E8] ml-4"
                            : " bg-white mr-4 "
                        }`}
                      >
                        {item.role === "user" ? (
                          <img src={user} className="rounded w-10 h-8" />
                        ) : (
                          <img src={logo} className="w-10 h-10" />
                        )}
                      </div>
                      <div
                        className={`relative mt-2 w-full h-full  flex ${
                          item.role === "user"
                            ? "bg-[#3f4f63] rounded-tr-0 rounded-tl-lg rounded-b-lg"
                            : "bg-[#502464] rounded-tl-0 rounded-tr-lg rounded-b-lg"
                        }`}
                      >
                        {item.role === "user" ? (
                          <div className="absolute -rotate-90 -right-3 cuscss">
                            <FaLocationPin color="#3f4f63" size={21} />
                          </div>
                        ) : (
                          <div className="absolute top-custom  rotate-90">
                            <FaLocationPin color="#502464" size={21} />
                          </div>
                        )}

                        <pre
                          className="px-5 py-5 text-white whitespace-pre-wrap "
                          dangerouslySetInnerHTML={{ __html: item.parts }}
                        ></pre>
                      </div>
                    </div>
                  </>
                ))}
                {loading && (
                  <div className="flex justify-center items-center h-10">
                  {/* <RingLoader color="#ffffff" loading={true} size={50} /> */}
                  <FadeLoader color="#ffffff"  loading={true} size={1}/>
                </div>
                )}
              </div>
            </div>

            <div className=" flex flex-row w-[60%] h-14">
              <div className="h-14 border border-white rounded-lg w-full flex justify-center items-center mr-2 border-opacity-50">
                <input
                  className="w-full bg-[#343541] mx-10 h-8 outline-none placeholder:text-white placeholder:font-thin text-white"
                  placeholder="Helloo"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div
                className=" border border-[#502464]  bg-[#502464] flex justify-center items-center px-4 rounded-lg border-opacity-50"
                onClick={handleSubmit}
              >
                <button className=" -rotate-45 ">
                  <IoSend scale={50} size={20} color="white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
