import React, { useState } from "react";
import conf from "../conf/conf";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AiOutlineSend } from "react-icons/ai";
import { FaRobot,FaUserCircle } from "react-icons/fa";

const Text = () => {
  const [input, setInput] = useState("");
  const [showResult, setShowResult] = useState([])
  const genAI = new GoogleGenerativeAI(conf.apikey);
  async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = String(input);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    setShowResult(prevResults => [
      ...prevResults,
      { type: "bot", msg: text }
    ]);
    
  }
  const handleSubmit = () => {
    if (input.trim() !== "") {
      setShowResult(prevResults => [
        ...prevResults,
        { role: "user", msg: input }
      ]);
     
      run();
      
      setInput("");
      
      
    }
  };

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className=" flex w-full h-20 justify-start items-center bg-[#502464]">
          <div className="ml-44 text-white text-2xl font-bold">
            CHAT GPT-V3.6
          </div>
        </div>
        <div className="w-screen h-screen px-20 ">
          <div className=" flex flex-col w-full h-full gap-5 mt-16">
            <div>
              <div className="w-[60%] h-custom bg-[#347482] bg-opacity-10 rounded-lg border-opacity-50 overflow-x-hidden overflow-y-scroll">
                {showResult.map((item, index) => (
                  <div
                    className={`pt-10 flex transition-transform duration-1000 ease-in-out ${
                      item.role === "user" ? "pr-10 flex-row-reverse" : "pl-10"
                    }`}
                    key={index}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex justify-center items-center ${
                        item.role === "user" ? " bg-green-700 " : " bg-red-700 "
                      }`}
                    >
                      {item.role === "user" ? (
                        <FaUserCircle color="white" size={22} />
                      ) : (
                        <FaRobot color="white" size={22} />
                      )}
                    </div>
                    <div className="mr-2 mt-2 ml-10 rounded-lg w-full h-full bg-[#badee7] flex">
                      <p className="m-10 text-gray-600">{item.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className=" flex flex-row w-[60%] h-14">
              <div className="h-14 border border-[#502464] rounded-lg w-full flex justify-center items-center mr-2 border-opacity-50">
                <input
                  className="w-full mx-10 h-8 outline-none placeholder:text-[#502464] placeholder:font-thin"
                  placeholder="Helloo"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <div className=" border border-[#502464] flex justify-center items-center px-4 rounded-lg border-opacity-50">
                <button className="-rotate-45" onClick={handleSubmit}>
                  <AiOutlineSend scale={50} size={20} color="#502464" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Text;
