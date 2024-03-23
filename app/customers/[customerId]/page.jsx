"use client";
import Sidebar from "@/components/sidebar";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useRouter, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const CustomerDetail = () => {
  const router = useRouter();
  const params = useParams();
  const [info, setInfo] = useState(null);
  const [token, setToken] = useState("");
  const checkAuth = () => {
    try {
      // Retrieve the token from the cookie
      const storedToken = Cookies.get("token");

      // Set the token in the component state
      setToken(storedToken);

      // Redirect to the login page if no token is found
      if (!storedToken) {
        router.push("/login");
      }
      return new Promise((resolve) => {
        // Simulate asynchronous operation (e.g., API call)
        setTimeout(() => {
          console.log("checkAuth completed");
          resolve();
        }, 1000);
      });
    } catch (error) {
      console.error("Error checking authentication:", error);
      // Handle error (e.g., redirect to login page)
      router.push("/login");
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/other/customers/${params.customerId}`,
        {
          withCredentials: true,
          /*  headers: {
          Authorization: `Bearer ${token}`,
        },*/
        }
      );

      setInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchDataAndCheckAuth = async () => {
      try {
        // Wait for checkAuth to complete
        await checkAuth();

        // After checkAuth is done, proceed with fetchData
        await fetchData();
      } catch (error) {
        console.error("Error during checkAuth or fetchData:", error);
      }
    };

    fetchDataAndCheckAuth();
  }, []);
  console.log(info);
  return (
    <section className="w-full flex">
      <Sidebar currentPage="Customer" />
      <main className="flex-grow px-8 py-4 bg-secondary-100">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-medium">Customer Info</h1>
          <button
            onClick={() => {
              router.push("/customers");
            }}
            className="group transition font-medium flex items-center bg-orange-400 px-4 h-8 gap-1 rounded-md hover:bg-orange-300 hover:pl-3 duration-300"
          >
            <img
              className="w-4 group-hover:mr-1"
              src="/left-arrow.svg"
              alt=""
            />
            Back
          </button>
        </div>
        <div className="grid grid-cols-12 mt-8 gap-y-4">
          <p className="font-semibold">Name: </p>
          <p className="col-span-11">{info && info.Cname}</p>
          <p className="font-semibold">Mail:</p>
          <p className="col-span-11">{info && info.Email}</p>
        </div>
        <p className="mt-4 font-medium">Receipt Info</p>
        {info && (
          <TableContainer marginTop={2} overflowY="scroll" maxWidth="100%">
            <Table variant="simple" bgColor={"white"} overflowY={"scroll"}>
              <Thead position="sticky" top={0} bgColor="white">
                <Tr>
                  <Th>RECEIVER NAME</Th>
                  <Th>PHONE NUMBER</Th>
                  <Th>ADDRESS</Th>
                </Tr>
              </Thead>
              <Tbody>
                {info.Receipt_Info.map((val, key) => (
                  <Tr className="hover:bg-slate-300 cursor-pointer" key={key}>
                    <Td className="cursor-pointer">{val.Receiver_name}</Td>
                    <Td className="cursor-pointer">{val.Phone_Number}</Td>
                    <Td className="cursor-pointer">{val.Address}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </main>
    </section>
  );
};

export default CustomerDetail;
