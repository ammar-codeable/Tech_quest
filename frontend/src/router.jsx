import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";

import ErrorPage from "./routes/ErrorPage";
import LandingPage from "./routes/LandingPage";
import SignInPage from "./routes/SignInPage";
import DashboardPage from "./routes/DashboardPage";
import ChatPage from "./routes/ChatPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}
