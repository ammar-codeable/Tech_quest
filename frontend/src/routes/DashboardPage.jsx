import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useUser } from "@clerk/clerk-react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import List from "../components/List";
import SearchBar from "../components/SearchBar";
import ModalForm from "../components/ModalForm";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isLoaded && !user) {
      navigate("/sign-in");
    } else if (isLoaded) {
      axios.post("http://localhost:3000/users/pushUser", {
        ...user
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
        <div className="flex-col">
          <div className="flex">
            <SearchBar />
            <button
              onClick={() => setIsModalOpen(true)}
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6 mb-1 pl-5 pr-5"
              type="button"
            >
              +
            </button>
            <ModalForm
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
          <List className="m-5" />
        </div>
      </div>
    </div>
  );
}
