import React, { useState } from "react";
import {
  FiDownload,
  FiDatabase,
  // ...any other icons you want
} from "react-icons/fi";

const AdminDatabase: React.FC = () => {
  // Track whether we are using an external DB
  const [useExternalDB, setUseExternalDB] = useState(false);

  // For controlling the pop-up modal
  const [showWarningModal, setShowWarningModal] = useState(false);

  // The value we plan to switch to (Local or External)
  // after the user confirms in the modal
  const [pendingDBToggle, setPendingDBToggle] = useState<boolean | null>(null);

  // External DB config
  const [externalDB, setExternalDB] = useState({
    host: "",
    port: 5432,
    username: "",
    password: "",
    databaseName: "",
    connectivityStatus: "Unknown",
  });

  // Attempt to switch DB (Local <-> External)
  // Instead of toggling immediately, we'll open the warning modal.
  const handleToggleDBSource = (nextValue: boolean) => {
    // If the nextValue differs from the current, we show the modal
    if (nextValue !== useExternalDB) {
      setPendingDBToggle(nextValue);
      setShowWarningModal(true);
    }
  };

  // If the user confirms in the modal:
  const confirmDBToggle = () => {
    if (pendingDBToggle !== null) {
      setUseExternalDB(pendingDBToggle);
    }
    setShowWarningModal(false);
    setPendingDBToggle(null);
  };

  // If the user cancels in the modal:
  const cancelDBToggle = () => {
    setShowWarningModal(false);
    setPendingDBToggle(null);
  };

  // Connectivity check handler (mocked)
  const testConnectivity = () => {
    setExternalDB({ ...externalDB, connectivityStatus: "Checking..." });
    setTimeout(() => {
      const success = Math.random() > 0.4;
      setExternalDB({
        ...externalDB,
        connectivityStatus: success ? "Connected" : "Failed",
      });
    }, 1000);
  };

  // Download DB schema (mock logic)
  const downloadSchema = () => {
    const sampleSchema = `-- Example DB schema --
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT
);

CREATE TABLE documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  content TEXT
);`;

    const blob = new Blob([sampleSchema], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "database_schema.sql";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Save handler
  const handleSave = () => {
    console.log("Use External DB?", useExternalDB);
    console.log("External DB Config:", externalDB);
    alert("Database configuration saved! Check console for details.");
  };

  return (
    <div className="p-2 bg-gray-50 relative">
      {/* Heading */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text font-semibold">Database</h2>
      </div>

      {/* Some example items (similar to your screenshot) */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 cursor-pointer hover:text-[#00847c] transition-colors">
          <FiDatabase />
          <span>Import Config from JSON File</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer hover:text-[#00847c] transition-colors">
          <FiDatabase />
          <span>Export Config to JSON File</span>
        </div>

        <hr className="border-gray-200" />

        <div className="flex items-center space-x-2 cursor-pointer hover:text-[#00847c] transition-colors">
          <FiDownload />
          <span>Download Database</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer hover:text-[#00847c] transition-colors">
          <FiDownload />
          <span>Export All Chats (All Users)</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer hover:text-[#00847c] transition-colors">
          <FiDownload />
          <span>Export LiteLLM config.yaml</span>
        </div>
      </div>

      {/* Database Source Toggle */}
      <label className="text-sm font-semibold inline-block">
        Database Source
      </label>
      <div className="inline-flex flex-col mt-2">
        {/* Toggle Buttons on a new line */}
        <div className="inline-flex rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => handleToggleDBSource(false)}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              !useExternalDB
                ? "bg-white shadow border border-gray-300"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Local DB
          </button>
          <button
            onClick={() => handleToggleDBSource(true)}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              useExternalDB
                ? "bg-white shadow border border-gray-300"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            External DB
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Switching this option will affect all settings and data in the
        application.
      </p>

      {/* External DB Settings (only if external is selected) */}
      {useExternalDB && (
        <div className="mt-4 space-y-2 bg-white p-2 rounded-lg border border-gray-300 shadow-sm">
          <h3 className="text-sm font-semibold">External Database Settings</h3>
          {/* Host */}
          <div className="flex items-center space-x-2">
            <label htmlFor="dbHost" className="text-sm w-28">
              Host
            </label>
            <input
              type="text"
              id="dbHost"
              value={externalDB.host}
              onChange={(e) =>
                setExternalDB({ ...externalDB, host: e.target.value })
              }
              className="flex-1 text-sm px-2 py-1 border rounded"
            />
          </div>
          {/* Port */}
          <div className="flex items-center space-x-2">
            <label htmlFor="dbPort" className="text-sm w-28">
              Port
            </label>
            <input
              type="number"
              id="dbPort"
              value={externalDB.port}
              onChange={(e) =>
                setExternalDB({
                  ...externalDB,
                  port: parseInt(e.target.value) || 5432,
                })
              }
              className="flex-1 text-sm px-2 py-1 border rounded"
            />
          </div>
          {/* Username */}
          <div className="flex items-center space-x-2">
            <label htmlFor="dbUser" className="text-sm w-28">
              Username
            </label>
            <input
              type="text"
              id="dbUser"
              value={externalDB.username}
              onChange={(e) =>
                setExternalDB({ ...externalDB, username: e.target.value })
              }
              className="flex-1 text-sm px-2 py-1 border rounded"
            />
          </div>
          {/* Password */}
          <div className="flex items-center space-x-2">
            <label htmlFor="dbPass" className="text-sm w-28">
              Password
            </label>
            <input
              type="password"
              id="dbPass"
              value={externalDB.password}
              onChange={(e) =>
                setExternalDB({ ...externalDB, password: e.target.value })
              }
              className="flex-1 text-sm px-2 py-1 border rounded"
            />
          </div>
          {/* Database Name */}
          <div className="flex items-center space-x-2">
            <label htmlFor="dbName" className="text-sm w-28">
              Database
            </label>
            <input
              type="text"
              id="dbName"
              value={externalDB.databaseName}
              onChange={(e) =>
                setExternalDB({
                  ...externalDB,
                  databaseName: e.target.value,
                })
              }
              className="flex-1 text-sm px-2 py-1 border rounded"
            />
          </div>
          {/* Connectivity */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-600">
              Status: {externalDB.connectivityStatus}
            </div>
            <button
              onClick={testConnectivity}
              className="px-2 py-1 bg-[#00847c] text-white text-sm rounded"
            >
              Test Connectivity
            </button>
          </div>
        </div>
      )}

      {/* DB Schema (Download only) */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold mb-1">Database Schema</h3>
        <div
          className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer hover:text-[#00847c] transition-colors inline-flex"
          onClick={downloadSchema}
        >
          <FiDownload />
          <span>Download Schema</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Download the current schema for review or backup.
        </p>
      </div>

      <div className="mt-4 text-gray-500 text-xs">
        Adjusting these settings will affect how the application stores or
        retrieves data.
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-[#00847c] text-white text-sm rounded"
      >
        Save
      </button>

      {/* Warning Modal (if user tries to toggle DB source) */}
      {showWarningModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-4">
            <h3 className="text-sm font-semibold mb-2 text-red-600 flex items-center">
              <span className="mr-2">
                <FiDatabase />
              </span>
              Warning
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              Changing the database source will affect all settings and data in
              the application. Are you sure you want to continue?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={cancelDBToggle}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDBToggle}
                className="px-3 py-1 text-sm bg-[#00847c] text-white rounded hover:bg-[#006f68]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDatabase;
