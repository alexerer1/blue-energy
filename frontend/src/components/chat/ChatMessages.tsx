import React, { FC } from "react";
import { RiRobot3Line } from "react-icons/ri";
import { BarLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant";
  content: string | React.ReactNode;
}

interface ChatMessagesProps {
  messages: Message[];
  loading: boolean;
}

const ChatMessages: FC<ChatMessagesProps> = ({ messages, loading }) => {
  return (
    <>
      {messages.map((msg, idx) => {
        // Assistant message
        if (msg.role === "assistant") {
          return (
            <div key={idx} className="flex items-start space-x-2">
              {/* Assistant Icon */}
              <div className="flex-shrink-0 mt-1">
                <RiRobot3Line className="text-primary mt-3" size={32} />
              </div>

              <div className="bg-gray-50 text-primary py-3 px-4 rounded-md shadow-sm max-w-[90%] whitespace-pre-wrap">
                {typeof msg.content === "string" ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    className="
                      prose 
                      prose-sm
                      leading-snug       /* Tighter line height */
                      prose-p:my-1       /* Reduce paragraph margin */
                      prose-ul:my-1
                      prose-ol:my-1
                    "
                  >
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          );
        }

        // User message
        return (
          <div key={idx} className="flex justify-end">
            <div className="bg-gray-100 text-primary p-3 rounded-md shadow-sm max-w-[80%] whitespace-pre-wrap">
              {typeof msg.content === "string" ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className="
                    prose 
                    prose-sm
                    leading-snug 
                    prose-p:my-1
                    prose-ul:my-1
                    prose-ol:my-1
                  "
                >
                  {msg.content}
                </ReactMarkdown>
              ) : (
                msg.content
              )}
            </div>
          </div>
        );
      })}

      {loading && (
        <div className="flex items-center space-x-2 w-full">
          <div className="flex-shrink-0 mt-1">
            <RiRobot3Line className="text-primary mt-2" size={32} />
          </div>
          <div className="flex-grow">
            <BarLoader width="100%" color="#02525e" />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatMessages;
