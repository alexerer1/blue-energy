import React, {
  FC,
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { FiX } from "react-icons/fi";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { outlierFlow, systematicDeviationFlow } from "../../data/mockData";

export interface ChatPanelProps {
  showChat: boolean;
  toggleChat: () => void;
}

export interface Message {
  role: "user" | "assistant";
  content: string | React.ReactNode;
}

const ChatPanel: FC<ChatPanelProps> = ({ showChat, toggleChat }) => {
  const [currentFunnel, setCurrentFunnel] = useState<string[]>([]);
  const [funnelType, setFunnelType] = useState<
    "outlier" | "systematicDeviation" | null
  >(null);
  const [currentFunnelStep, setCurrentFunnelStep] = useState<number>(0);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello, how can I help you with this report?",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollContainerRef.current && isAtBottom) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [isAtBottom]);

  const handleUserScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;
    const nearBottom = Math.abs(scrollTop + clientHeight - scrollHeight) < 10;
    setIsAtBottom(nearBottom);
  };

  const focusChatInput = () => {
    if (chatInputRef.current) {
      chatInputRef.current.focus();
    }
  };

  const sendNextFunnelMessage = (
    step: number = 0,
    currentFunnelType: "outlier" | "systematicDeviation" | null = null,
  ) => {
    let nextMsg = "";

    // If it's the first step, set up the funnel
    if (step === 0) {
      if (currentFunnelType === "outlier") {
        setCurrentFunnel(outlierFlow);
        nextMsg = outlierFlow[0];
      } else if (currentFunnelType === "systematicDeviation") {
        setCurrentFunnel(systematicDeviationFlow);
        nextMsg = systematicDeviationFlow[0];
      }
      setCurrentFunnelStep(1); // Move to the next step
    } else {
      // Continue the funnel
      if (currentFunnel.length > step) {
        nextMsg = currentFunnel[step];
        setCurrentFunnelStep((prev) => prev + 1);
      } else {
        // End of the funnel
        nextMsg = "That’s all I have on this topic. Anything else?";
        setCurrentFunnel([]);
        setFunnelType(null);
      }
    }

    // Add the assistant message with a slight delay
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: nextMsg }]);
      setLoading(false);
      scrollToBottom();
      focusChatInput();
    }, 800);
  };

  const handleSendMessage = (userMessage: string) => {
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    scrollToBottom();

    if (currentFunnel.length > currentFunnelStep) {
      sendNextFunnelMessage(currentFunnelStep, funnelType);
      return;
    }

    const lowerMsg = userMessage.toLowerCase();
    const outlierRegex = /outlier/;
    const systematicDeviationRegex = /deviation|systematic deviation/;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      if (outlierRegex.test(lowerMsg)) {
        setCurrentFunnel(outlierFlow);
        setFunnelType("outlier");
        setCurrentFunnelStep(0);
        sendNextFunnelMessage(0, "outlier");
      } else if (systematicDeviationRegex.test(lowerMsg)) {
        setCurrentFunnel(systematicDeviationFlow);
        setFunnelType("systematicDeviation");
        setCurrentFunnelStep(0);
        sendNextFunnelMessage(0, "systematicDeviation");
      } else {
        const defaultMsg: Message = {
          role: "assistant",
          content: (
            <div>
              <p>
                I have detected abnormalities in the data that exhibit
                systematic deviations. Additionally, there appear to be several
                outliers. Would you like me to provide more details about these
                findings?
              </p>
              <div className="flex items-center justify-start space-x-2 mt-2">
                <button
                  onClick={() => handleFunnelButtonClick("outlier")}
                  className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-full text-primary hover:text-primary bg-gray-100 hover:bg-gray-200 transition-all duration-300 shadow-sm text-sm font-medium"
                >
                  Outliers
                </button>
                <button
                  onClick={() => handleFunnelButtonClick("systematicDeviation")}
                  className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-full text-primary hover:text-primary bg-gray-100 hover:bg-gray-200 transition-all duration-300 shadow-sm text-sm font-medium"
                >
                  Systematic Deviations
                </button>
              </div>
            </div>
          ),
        };

        setMessages((prev) => [...prev, defaultMsg]);
        scrollToBottom();
        focusChatInput();
      }
    }, 800);
  };

  const handleFunnelButtonClick = (type: "outlier" | "systematicDeviation") => {
    handleSendMessage(type);
  };

  useEffect(() => {
    scrollToBottom();
    focusChatInput();
  }, [messages, scrollToBottom]);

  useLayoutEffect(() => {
    if (!inputContainerRef.current) return;
    const observer = new ResizeObserver(() => {
      scrollToBottom();
    });
    observer.observe(inputContainerRef.current);
    return () => observer.disconnect();
  }, [inputContainerRef, scrollToBottom]);

  return (
    <div
      className={`flex flex-col bg-white border-l border-gray-200 shadow-lg transition-all duration-300 ease-in-out ${
        showChat ? "w-full md:w-1/3" : "w-0"
      } overflow-hidden`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-primary">Chat with Report</h2>
        <button
          onClick={toggleChat}
          className="text-gray-600 hover:text-gray-800"
        >
          <FiX size={24} />
        </button>
      </div>

      {/* Messages */}
      <div
        className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto"
        ref={scrollContainerRef}
        onScroll={handleUserScroll}
      >
        <ChatMessages messages={messages} loading={loading} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4" ref={inputContainerRef}>
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={loading}
          inputRef={chatInputRef}
        />
      </div>
    </div>
  );
};

export default ChatPanel;
