import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";

const AdminInterface = () => {
  const [banners, setBanners] = useState([
    {
      type: "Warning",
      message:
        "Please refrain from using data that contains PII and other GDPR sensitive or classified information",
      enabled: false,
    },
    {
      type: "Success",
      message:
        "A new document analyzer has been deployed! Please re-upload your documents.",
      enabled: true,
    },
  ]);

  const [promptSuggestions, setPromptSuggestions] = useState([
    {
      prompt: "Help me write a prompt",
      description: "to extract information from documents",
    },
    {
      prompt: "Give me ideas",
      description: "for what to do with my kids' art",
    },
    {
      prompt: "Tell me a fun fact",
      description: "about the Roman Empire",
    },
    {
      prompt: "Show me a code snippet",
      description: "of a website's sticky header",
    },
    {
      prompt: "Explain options trading",
      description: "if I'm familiar with buying and selling",
    },
    {
      prompt: "Overcome procrastination",
      description: "give me tips",
    },
    {
      prompt: "Grammar check",
      description: "rewrite it for better readability",
    },
  ]);

  const toggleBanner = (index: number) => {
    const updatedBanners = banners.map((banner, i) =>
      i === index ? { ...banner, enabled: !banner.enabled } : banner,
    );
    setBanners(updatedBanners);
  };

  const removeBanner = (index: number) => {
    const updatedBanners = banners.filter((_, i) => i !== index);
    setBanners(updatedBanners);
  };

  const addBanner = () => {
    setBanners([
      ...banners,
      { type: "Info", message: "New banner message", enabled: false },
    ]);
  };

  const removePrompt = (index: number) => {
    const updatedPrompts = promptSuggestions.filter((_, i) => i !== index);
    setPromptSuggestions(updatedPrompts);
  };

  return (
    <div className="p-2 bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text font-semibold">Banners</h2>
        <button
          onClick={addBanner}
          className="flex items-center text-sm text-gray-500 hover:text-[#00847c] space-x-1"
        >
          <FiPlus />
          <span>Add Banner</span>
        </button>
      </div>
      <div className="space-y-2">
        {banners.map((banner, index) => (
          <div key={index} className="flex items-center">
            <div className="flex-1 flex items-center space-x-2 px-2 py-1 rounded-lg border border-gray-300 shadow-sm bg-white">
              <select
                value={banner.type}
                onChange={(e) => {
                  const updatedBanners = [...banners];
                  updatedBanners[index].type = e.target.value;
                  setBanners(updatedBanners);
                }}
                className="text-sm rounded px-1 py-1"
              >
                <option value="Success">Success</option>
                <option value="Warning">Warning</option>
                <option value="Info">Info</option>
                <option value="Error">Error</option>
              </select>
              <input
                type="text"
                value={banner.message}
                onChange={(e) => {
                  const updatedBanners = [...banners];
                  updatedBanners[index].message = e.target.value;
                  setBanners(updatedBanners);
                }}
                className="flex-1 text-sm px-2 py-1"
              />
              <div
                className={`relative w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${
                  banner.enabled ? "bg-[#00847c]" : "bg-gray-300"
                }`}
                onClick={() => toggleBanner(index)}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                    banner.enabled ? "translate-x-4" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </div>
            <button
              onClick={() => removeBanner(index)}
              className="ml-2 text-gray-500 hover:text-red-500 transition-colors duration-300"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-sm font-semibold mt-6 mb-2">
        Default Prompt Suggestions
      </h2>
      <div className="grid grid-cols-2 gap-2">
        {promptSuggestions.map((suggestion, index) => (
          <div
            key={index}
            className="p-2 rounded-lg flex items-center justify-between bg-white shadow-sm"
          >
            <div>
              <p className="text-sm font-medium">{suggestion.prompt}</p>
              <p className="text-xs text-gray-600">{suggestion.description}</p>
            </div>
            <button
              onClick={() => removePrompt(index)}
              className="text-gray-500 hover:text-red-500 transition-colors duration-300"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 text-gray-500 text-xs">
        Adjusting these settings will apply changes universally to all users.
      </div>

      <button className="mt-4 px-4 py-2 bg-[#00847c] text-white text-sm rounded">
        Save
      </button>
    </div>
  );
};

export default AdminInterface;
