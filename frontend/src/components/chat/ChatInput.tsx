import React, { FC, useState, KeyboardEvent, RefObject } from "react";
import { FiPaperclip, FiArrowUp } from "react-icons/fi";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
  inputRef: RefObject<HTMLTextAreaElement>; // Accept ref from parent
}

const ChatInput: FC<ChatInputProps> = ({
  onSendMessage,
  disabled,
  inputRef,
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (message.trim() === "") return;
    onSendMessage(message);
    setMessage("");
    // Reset height after sending
    if (inputRef.current) {
      inputRef.current.style.height = "40px";
    }
  };

  const handleInput = () => {
    if (inputRef.current) {
      // Reset height
      inputRef.current.style.height = "40px";
      // Max height 250px
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 250)}px`;
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex items-center w-full bg-gray-100 rounded-lg px-4 py-2 shadow-sm"
    >
      {/* Paperclip (Upload) Icon */}
      <button
        type="button"
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={() => console.log("Attach file action")}
      >
        <FiPaperclip size={20} />
      </button>

      {/* Resizable Textarea Field */}
      <textarea
        ref={inputRef}
        rows={1}
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="flex-grow bg-transparent px-4 text-gray-800 placeholder-gray-500 focus:outline-none resize-none overflow-hidden"
        style={{ height: "40px" }}
      />

      {/* Send Icon */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={message.trim() === "" || disabled}
        className={`ml-2 p-2 rounded-full border transition-all duration-300 shadow-sm ${
          message.trim() === "" || disabled
            ? "bg-gray-300 border-gray-300 text-gray-400 cursor-not-allowed"
            : "bg-gray-100 border-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-200"
        } focus:outline-none`}
      >
        <FiArrowUp
          size={20}
          className={
            message.trim() === "" || disabled ? "text-gray-400" : "text-primary"
          }
        />
      </button>
    </form>
  );
};

export default ChatInput;
