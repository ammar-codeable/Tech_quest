import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import RootLayout from "./layouts/root-layout";
import LandingPage from "./routes/LandingPage";
import SignInPage from "./routes/SignInPage";
import ErrorPage from "./routes/ErrorPage";
import DashboardLayout from "./layouts/dashboard-layout";
import DashboardHomePage from "./routes/DashboardHomePage";
import { ClerkProvider } from "@clerk/clerk-react";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/*", element: <ErrorPage /> },
    ]
  },
  {
    path: "/sign-in",
    element: <RootLayout />,
    children: [
      { path: "/sign-in", element: <SignInPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "/dashboard", element: <DashboardHomePage /> },
    ],
  },
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider navigate={navigate} publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);
