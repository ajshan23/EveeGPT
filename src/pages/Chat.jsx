import React, { useEffect, useState } from "react";
import conf from "../conf/conf";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { FaRobot,FaUserCircle  } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import img from "../image/appuimage.jpg"
import './style.css'
import logo from '../image/umbrion.png'
import user from '../image/user.jpg'

const Chat = () => {
  const genAI = new GoogleGenerativeAI(conf.apikey);

  const [input, setInput] = useState("");
  const [allResults, setAllresults] = useState([]);
  const [history, setHistory] = useState([]);

 
  async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
      
      history: history,
      generationConfig: {
        maxOutputTokens: input.includes('more')? 300:100,
      },
    });
   
    const result = await chat.sendMessage(input);
    const response = await result.response;
    const text = await response.text();
  setHistory(prev=>[...prev,{role:"model",parts:text}])
    setAllresults(prevResults => [
      ...prevResults,
      { role: "model", parts: text }
    ]);
    
  }
  const handleSubmit = () => {
    if (input.trim() !== "") {
      setAllresults(prevResults => [
        ...prevResults,
        { role: "user", parts: input }
      ]);
      setHistory(prev=>[...prev,{role:"user",parts:input}])
      run();
      
      setInput("");
      
      
    }
  };
  useEffect(() => {
    handleSubmit();
  }, []);
  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className=" flex w-full h-20 justify-start items-center bg-[#502464]">
          <div className=" flex items-center ml-20 text-white text-2xl font-bold gap-3">
            <div>EVEE GPT</div>
            <div><img src={logo} alt="" width={40} height={40} className="" /></div>
          </div>
        </div>
        <div className="w-screen h-screen px-20 ">
          <div className=" flex flex-col w-full h-full gap-5 mt-10">
            <div>
              <div className=" py-2 scroll-container w-[60%] h-custom bg-opacity-10  border-[#502464] border-2 rounded-lg border-opacity-30 overflow-x-hidden overflow-y-scroll scroll-smooth" style={{backgroundImage:img}}>


              {
   allResults.map((item, index) => (
    <div
      className={`py-4 px-10 flex transition-transform duration-1000 ease-in-out ${
        item.role === 'user' ? ' flex-row-reverse ' : ''
      }`}
      key={index}
    >
      <div className={`w-10 h-10 rounded-full flex justify-center items-center overflow-hidden ${item.role==='user'?'bg-[#E8E8E8] ml-2':' bg-[#502464] mr-2 ' }`}>
       {item.role==='user'? <img src={user}  className="rounded" />: <FaRobot color="white" size={21} />}
      </div>
      <div className={` mt-2 w-full h-full  flex ${item.role==='user' ?'bg-green-700 bg-opacity-30 rounded-tr-0 rounded-tl-lg rounded-b-lg' :'bg-[#502464] bg-opacity-30 rounded-tl-0 rounded-tr-lg rounded-b-lg'}`} >
        
        <div className="px-5 py-5 text-black">{item.parts}</div>
      </div>
    </div>
  ))
}





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
              <div className=" border border-[#502464]  bg-[#502464] flex justify-center items-center px-4 rounded-lg border-opacity-50"  onClick={handleSubmit}>
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