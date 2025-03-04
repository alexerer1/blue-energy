import React from "react";
import { useParams } from "react-router-dom";

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold text-gray-800">
        Chat for Case ID: <span className="text-blue-600">{id}</span>
      </h1>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-4">
        <p className="text-gray-600">
          Start your conversation about this case here...
        </p>
        <textarea
          className="w-full h-32 mt-4 p-2 border rounded resize-none focus:ring focus:ring-blue-300"
          placeholder="Type your message here..."
        />
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
