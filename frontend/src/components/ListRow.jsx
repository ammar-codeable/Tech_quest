import { Table } from "flowbite-react";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export default function ListRow({ category, id, name, age }) {
  const [reportBot, setReportBot] = useState("Report Upload Report");
  const { isSignedIn, isLoaded, user } = useUser();
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setReportBot(selectedFile.name);
  };

  const handleSubmission = () => {
    setReportBot("Uploading Report...");
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post(
        `http://localhost:4000/userMedicalDetails/${user.id}`,
        formData,
        config
      )
      .then((response) => {
        setReportBot(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {id}
      </Table.Cell>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>
        <div>
          <Button
            component="label"
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            {reportBot}
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileChange}
              name="file"
            />
          </Button>
          <Button onClick={handleSubmission}>Submit</Button>
        </div>
      </Table.Cell>
    </Table.Row>
  );
}
