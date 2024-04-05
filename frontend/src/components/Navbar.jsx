"use client";

import { DarkThemeToggle, Navbar } from "flowbite-react";
import SignInButton from "./SignInButton";

export default function TNavbar() {
  return (
    <Navbar className="bg-gray-100 m-0 p-3" fluid>
      <Navbar.Brand href="/dashboard">
        <img
          src="Logo.jpeg"
          className="mr-3 h-8 sm:h-12 rounded-full"
          alt="Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          TechQuest
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <DarkThemeToggle className="mr-4 border border-gray-300 border-opacity-50" />
        <SignInButton />
      </div>
    </Navbar>
  );
}
