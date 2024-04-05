import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

export default function DashboardLayout() {
  const { user, isLoaded, isSignedIn } = useUser();
  // const navigate = useNavigate();

//   console.log("test:", userId);

//   useEffect(() => {
//     if (!userId) {
//       navigate("/sign-in");
//     } else {
//       axios.post("http://localhost:3000/users/pushUser", { userId: userId });
//     }
//   }, [userId]);

//   if (!isLoaded) return <div className="text-center">"Loading..."</div>;

  return (
    <>
      <header></header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
