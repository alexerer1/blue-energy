import React, { FC } from "react";

import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import LandingPage from "./pages/LandingPage";

import GenerateReportPage from "./pages/GenerateReportPage";

import PreviousCasesPage from "./pages/PreviousCasesPage";

import ChatPage from "./pages/ChatPage";

import AdminPage from "./pages/AdminPage"; // Admin page with its own routing

const App: FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/generate-report" element={<GenerateReportPage />} />

          <Route path="/previous-reports" element={<PreviousCasesPage />} />

          <Route path="/chat/:id" element={<ChatPage />} />

          {/* Route for Admin Page */}

          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
