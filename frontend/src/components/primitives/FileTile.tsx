import React from "react";
import { FiX, FiImage, FiFileText, FiFile } from "react-icons/fi";
import { motion } from "framer-motion";

interface FileTileProps {
  file: File;
  onRemove: (fileName: string) => void;
}

const FileTile: React.FC<FileTileProps> = ({ file, onRemove }) => {
  // Determine the file icon based on the file name
  const getFileIcon = (fileName: string) => {
    if (fileName.match(/\.(png|jpe?g|gif)$/)) return <FiImage size={20} />;
    if (fileName.match(/\.(txt|docx?|pdf)$/)) return <FiFileText size={20} />;
    return <FiFile size={20} />;
  };

  return (
    <motion.div
      className="relative flex items-center justify-between bg-white p-3 rounded-lg shadow-md"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3">
        <div className="text-[#00847c]">{getFileIcon(file.name)}</div>
        <div>
          <p className="text-sm font-medium">{file.name}</p>
          <p className="text-xs text-gray-500">
            {Math.round(file.size / 1024)} KB
          </p>
        </div>
      </div>
      {/* Remove Button */}
      <button
        onClick={() => onRemove(file.name)}
        className="text-red-500 hover:text-red-700 transition-all duration-200"
      >
        <FiX size={20} />
      </button>
    </motion.div>
  );
};

export default FileTile;
