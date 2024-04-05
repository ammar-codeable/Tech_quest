import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useUser } from "@clerk/clerk-react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import ChatInput from "../components/ChatInput";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !user) {
      navigate("/sign-in");
    } else if (isLoaded) {
      axios.post("http://localhost:3000/users/pushUser", {
        userId: user.userId,
      });
    }
  }, [user, isLoaded]);

  if (!isLoaded){
  return (
    <div className="flex justify-center items-center h-screen">
      <span className="text-4xl font-bold">Loading...</span>
    </div>
  );}

  return (
    <div className="bg-gray-900 min-h-screen m-0 p-0">
      <div className="flex"> 
        <Sidebar />
        <ChatInput />
      </div>
    </div>
  );
}
