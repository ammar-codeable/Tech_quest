import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios'; 
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";


function UploadPdf() {
  const [reportBot, setReportBot] = useState("Report Upload Report");
  const { isSignedIn, isLoaded, user } = useUser();
  const [file, setFile] = useState();

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });


  return (
    <>
      <SignedOut>
        <div className="flex p-10 text-7xl justify-center items-center">
          Please Sign in to view this page!
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl text--rose-500 sans-serif px-2">
            Hey there! Would you like to talk to your personal assistant? Please
            submit your medical reports.
          </h1>
          <div>
            <Button
              component="label"
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileChange}
                name="file"
              />
            </Button>
            <Button onClick={handleSubmission}>Submit</Button>
          </div>
          <div className="w-3/4 text-center mt-5">{
            reportBot.data ?${reportBot.data}:reportBot
          }

          </div>
          {/* <button className="bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={()=>{}}>Refresh</button> */}
        </div>
      </SignedIn>
      <img
        src="doctor-removebg-preview.png"
        alt=""
        className="h-56 mt-48 ml-10 absolute "
      />
    </>
  );
}

export default UploadPdf;