import type { Message, MessageProps } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { deleteMessage, selectMessages } from "@/slices/toastSlice";
import { useEffect, useState } from "react";

const Message = ({ message }: MessageProps) => {
  const dispatch = useAppDispatch();
  const [progession, setProgression] = useState<number>(100);
  const isError = message.type === "error";

  useEffect(() => {
    const pg = progession - 1;
    if (pg < 0) {
      dispatch(deleteMessage(message.uuid));
      return;
    }
    const timeoutID = setTimeout(() => setProgression(() => pg), 50);
    return () => clearInterval(timeoutID);
  }, [progession, dispatch, message.uuid]);

  return (
    <div className={`w-md rounded-md font-medium wrap-break-word ${isError ? "bg-red-400" : "bg-green-400"}`}>
      <p className="h-25 overflow-scroll px-2 pt-2">{message.content}</p>
      <div
        className={`mt-2 h-1 ${isError ? "bg-red-500" : "bg-green-500"} w-[${progession}%] `}
        style={{ width: `${progession}%` }}
      ></div>
    </div>
  );
};

const Toast = () => {
  const messages = useAppSelector(selectMessages);

  return (
    <>
      {messages.length !== 0 && (
        <ul className="absolute z-10 flex h-screen w-screen flex-col items-center gap-4 overflow-scroll bg-[rgba(0,0,0,0.5)] pt-8 pr-8">
          {messages.map((value) => (
            <li key={value.uuid}>
              <Message message={value} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Toast;
