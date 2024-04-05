import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export default function SignInButton() {
  return (
    <>
      <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
      </SignedIn>
      <SignedOut>
        <Link to="/sign-in">
          <Button>Sign In</Button>
        </Link>
      </SignedOut>
    </>
  );
}
