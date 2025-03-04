import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout";
import GeneralSettings from "../components/admin/GeneralSettings";
import Users from "../components/admin/Users";
import Connections from "../components/admin/Connections";
import AdminInterface from "../components/admin/AdminInterface";
import AdminAnalysis from "../components/admin/AdminAnalysis";
import AdminReport from "../components/admin/AdminReport";
import AdminDatabase from "../components/admin/AdminDatabase";

const AdminPage = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="general" element={<GeneralSettings />} />
        <Route path="report" element={<AdminReport />} />

        <Route path="analysis" element={<AdminAnalysis />} />
        <Route path="users" element={<Users />} />
        <Route path="connections" element={<Connections />} />
        <Route path="interface" element={<AdminInterface />} />
        <Route path="database" element={<AdminDatabase />} />
        {/* Add additional routes as needed */}
        <Route path="*" element={<div>Select an admin section</div>} />
      </Route>
    </Routes>
  );
};

export default AdminPage;
