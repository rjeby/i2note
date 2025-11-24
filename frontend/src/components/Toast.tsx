import type { Message, MessageProps } from "@/types";
import { useEffect, useState } from "react";

const messagesMock: Message[] = new Array(10)
  .fill({
    uuid: "1",
    content: new Array(1000).fill("X").join(""),
    type: "success",
  })
  .map((value, index) => ({ ...value, uuid: index.toString() }));

const Message = ({ message, onMessageDeletion }: MessageProps) => {
  const [progession, setProgression] = useState<number>(100);
  const isError = message.type === "error";

  useEffect(() => {
    const pg = progession - 1;
    if (pg < 0) {
      onMessageDeletion(message.uuid);
      return;
    }
    const timeoutID = setTimeout(() => setProgression(() => pg), 50);
    return () => clearInterval(timeoutID);
  }, [progession, onMessageDeletion, message.uuid]);

  return (
    <div className={`w-md rounded-md font-medium wrap-break-word ${isError ? "bg-red-400" : "bg-green-400"}`}>
      <p className="h-25 overflow-scroll px-2 pt-2">{message.content}</p>
      <div
        className={`mt-2 h-2 rounded-md ${isError ? "bg-red-500" : "bg-green-500"} w-[${progession}%] `}
        style={{ width: `${progession}%` }}
      ></div>
    </div>
  );
};

const Toast = () => {
  const [messages, setMessages] = useState<Message[]>(messagesMock);

  const handleMessageDeletion = (uuid: string) => {
    setMessages((ms) => ms.filter((value) => value.uuid !== uuid));
  };

  return (
    <ul className="absolute z-10 flex h-screen w-screen flex-col items-end gap-4 overflow-scroll bg-[rgba(0,0,0,0.5)] pt-8 pr-8">
      {messages.map((value) => (
        <li key={value.uuid}>
          <Message message={value} onMessageDeletion={handleMessageDeletion} />
        </li>
      ))}
    </ul>
  );
};

export default Toast;
