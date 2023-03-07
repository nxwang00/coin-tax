import React, { useState, useEffect, useRef } from "react";
import ExpertPhoto from "../../../assets/imgs/expert-photo.jpg";
import { MOCKUP_CHAT_MSGS } from "../../../services/mockus";
import { format } from "date-fns";

const ChatBox = (props) => {
  const { onChatFinish } = props;

  const divRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessages(MOCKUP_CHAT_MSGS);
  }, []);

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onMessageSend = () => {
    if (!message) return;

    const msgItem = {
      id: JSON.stringify(messages.length),
      msg: message,
      type: "sent",
      time: format(new Date(), "hh:mm"),
    };
    const updatedMessages = [...messages, msgItem];
    setMessages(updatedMessages);
    setMessage("");
  };

  return (
    <div className="w-80 h-96 bg-white rounded shadow-2xl absolute right-5 -bottom-12">
      <nav className="w-full h-10 bg-sky-400 rounded-tr rounded-tl flex justify-between items-center">
        <div className="flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-white ml-2 cursor-pointer"
            onClick={onChatFinish}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <img
            className="w-8 h-8 rounded-full ml-1"
            src={ExpertPhoto}
            alt="user avatar"
          />
          <span className="text-xs font-medium text-white ml-1">
            Alex cairo
          </span>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-white mr-4 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-white mr-4 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
        </div>
      </nav>
      <div
        className="overflow-auto px-1 py-1"
        style={{ height: "19rem" }}
        id="journal-scroll"
      >
        <div className="flex items-center pr-16">
          <img
            className="w-4 h-4 rounded-full ml-1"
            src={ExpertPhoto}
            alt="user avatar"
          />
          <span
            className="flex ml-1 h-auto bg-gray-200 text-black font-normal rounded-sm px-1 p-1 items-end"
            style={{ fontSize: 11 }}
          >
            Hi Dr.Hendrikson, I haven't been feeling well for past few days.{" "}
            <span className="text-gray-600 pl-1" style={{ fontSize: 9 }}>
              01:25
            </span>
          </span>
        </div>
        <div className="flex justify-end pt-2 pl-16">
          <span
            className="bg-cyan-200 h-auto text-black text-xs font-normal rounded-sm px-1 p-1 items-end flex justify-end"
            style={{ fontSize: 11 }}
          >
            Lets jump on a video call.{" "}
            <span className="text-gray-600 pl-1" style={{ fontSize: 9 }}>
              02.30
            </span>
          </span>
        </div>
        <div className="flex justify-center">
          <span className="text-gray-600 text-xs pt-4" style={{ fontSize: 9 }}>
            Call started at 02:33 am
          </span>
        </div>
        <div className="flex justify-center">
          <span className="text-gray-600 text-xs" style={{ fontSize: 9 }}>
            Call ended at 02:33 am
          </span>
        </div>
        {messages.map((msg) =>
          msg.type === "received" ? (
            <div className="flex items-center pr-16 mt-1" key={msg.id}>
              <img
                className="w-4 h-4 rounded-full ml-1"
                src={ExpertPhoto}
                alt="user avatar"
              />
              <span
                className="flex ml-1 h-auto bg-gray-200 text-black font-normal rounded-sm px-1 p-1 items-end"
                style={{ fontSize: 11 }}
              >
                {msg.msg}
                <span className="text-gray-600 pl-1" style={{ fontSize: 9 }}>
                  {msg.time}
                </span>
              </span>
            </div>
          ) : (
            <div className="flex justify-end pt-2 pl-20" key={msg.id}>
              <span
                className="bg-cyan-200 h-auto text-black text-xs font-normal rounded-sm px-1 p-1 items-end flex justify-end"
                style={{ fontSize: 11 }}
              >
                {msg.msg}
                <span className="text-gray-600 pl-1" style={{ fontSize: 9 }}>
                  {msg.time}
                </span>
              </span>
            </div>
          )
        )}
        <div ref={divRef} className></div>
      </div>
      <div className="flex justify-between items-center p-1 ">
        <div className="relative w-4/5">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-white cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="input-group-1"
            className="bg-sky-400 text-white placeholder-gray-100 rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-8 py-1"
            style={{ fontSize: 11 }}
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="absolute inset-y-0 right-8 flex items-center pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-white cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
              />
            </svg>
          </div>
          <div className="absolute inset-y-0 right-2 flex items-center pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-white cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
              />
            </svg>
          </div>
        </div>
        <div className="w-7 h-7 rounded-full bg-gray-800 text-center items-center flex justify-center hover:bg-gray-900 hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
            />
          </svg>
        </div>
        <div className="w-7 h-7 rounded-full bg-gray-800 text-center items-center flex justify-center">
          <button
            className="w-7 h-7 rounded-full text-center items-center flex justify-center focus:outline-none hover:bg-gray-900 hover:text-white"
            onClick={onMessageSend}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
