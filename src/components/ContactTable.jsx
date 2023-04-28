import React from "react";
import { Table } from "@mantine/core";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
  useDeleteContactMutation,
  useGetContactsQuery,
} from "../redux/api/contactApi";

const ContactTable = () => {
  const token = JSON.parse(Cookies.get("token"));
  const [deleteContact] = useDeleteContactMutation();
  const { data } = useGetContactsQuery(token);

  const rows = data?.contacts?.data?.map((element) => (
    <tr key={element.id}>
      <td>{element.name}</td>
      <td>{element.phone}</td>
      <td>{element.email ? element.email : "example@gmail.com"}</td>
      <td>{element.address ? element.address : "example Address"}</td>
      <td className=" flex gap-1">
        <Link>
          <button className=" p-2 text-white rounded bg-blue-500">
            <AiOutlineFileSearch />
          </button>
        </Link>
        <Link>
          <button className=" p-2 text-white rounded bg-green-500">
            <FiEdit />
          </button>
        </Link>
        <button
          onClick={async () => {
            const id = element.id;
            const data = await deleteContact({id, token});
            console.log(data);
          }}
          className=" p-2 text-white rounded bg-red-500"
        >
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  ));
  return (
    <div className=" flex flex-col ml-5">
      <Link to={"/create"}>
        <button className=" py-1 px-2 rounded bg-blue-500 text-white my-3">
          Create
        </button>
      </Link>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Control</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default ContactTable;
