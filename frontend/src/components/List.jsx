
"use client";

import { Table } from "flowbite-react";
import ListRow from "./ListRow";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react"
import axios from "axios";

export default function List() {
  const [users, setUsers] = useState([])
  const { isSignedIn, isLoaded, user } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    axios.get("http://localhost:3000/users/getUsers", {
    }).then((res) => {
      setUsers(res.data.data)
      console.log(res.data.data);
    })

  }, [isLoaded, isSignedIn, user])


  return (
    <div className="overflow-x-auto m-5">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Patient Id</Table.HeadCell>
          <Table.HeadCell>Patient Name</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users.length == 0 ? <h1>Loading....</h1> : users.map((user) => <ListRow id={user.userId} name={user.name}/>)}
        </Table.Body>
      </Table>
    </div>
  );
}
