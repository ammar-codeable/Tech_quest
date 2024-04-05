import { HiChartPie, HiTable, HiChat, HiLockClosed } from "react-icons/hi";
import { DarkThemeToggle, Sidebar, SidebarItem } from "flowbite-react";

export default function TSidebar() {
  return (
    <div className="h-screen">
      <Sidebar aria-label="Default sidebar example" rounded>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <div className="flex">
              <Sidebar.Item href="/dashboard" icon={HiChartPie}>
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item icon={HiLockClosed} align="right"/>
            </div>
            <Sidebar.Item href="/chat" icon={HiChat}>
              Chat
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiTable}>
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <div className="absolute bottom-0 left-0 ml-4 mb-4">
        <DarkThemeToggle className="border border-gray-300 bg-gray-800 border-opacity-50" />
      </div>
    </div>
  );
}
