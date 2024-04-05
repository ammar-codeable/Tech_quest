
"use client";

import { Table } from "flowbite-react";
import ListRow from "./ListRow";

export default function List() {
  return (
    <div className="overflow-x-auto m-5">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Patient Id</Table.HeadCell>
          <Table.HeadCell>Patient Name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Age</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <ListRow id={1234} name={"hi"} age={21} category={"Critical"}/>
          <ListRow id={1234} name={"hi"} age={21} category={"Critical"}/>
          <ListRow id={1234} name={"hi"} age={21} category={"Critical"}/>
        </Table.Body>
      </Table>
    </div>
  );
}
