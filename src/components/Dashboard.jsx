import React from "react";
import { Outlet } from "react-router-dom"; // Outlet for nested routes
import Sidebar from "./Sidebar";
import Header from "./Header";

const Dashboard = ({ role , children }) => {
  return (
    <div className="flex min-h-screen min-w-full bg-background text-textMain">
      {/* Sidebar receives role */}
      <Sidebar role={role} />

      <div className="flex flex-col flex-1">
        {/* Top Header */}
        <Header />

        {/* Main content area */}
        <main className="flex-1 p-8">
          {/* Nested routes will render here */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;