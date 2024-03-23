"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import CustomerSearchBar from "../../components/CustomerSearchBar";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
const CustomerPage = () => {
  const [info, setInfo] = useState(null);
  const router = useRouter();
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
        `http://localhost:8000/other/customers`,
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
    <section className="flex bg-secondary-100">
      <Sidebar currentPage="Customer" />
      <main className="px-8 py-4 grow flex flex-col h-screen">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-primary text-5xl">Customers</h1>
        </div>
        <CustomerSearchBar onDatFromChild={setInfo}/>
        {info && (
          <TableContainer marginTop={6} overflowY="scroll" maxWidth="100%">
            <Table variant="simple" bgColor={"white"} overflowY={"scroll"}>
              <Thead position="sticky" top={0} bgColor="white">
                <Tr>
                  <Th>CUSTOMER ID</Th>
                  <Th>CUSTOMER NAME</Th>
                  <Th>CUSTOMER EMAIL</Th>
                </Tr>
              </Thead>
              <Tbody>
                {info.map((val, key) => (
                  <Tr
                    className="hover:bg-slate-300 cursor-pointer"
                    key={key}
                    onClick={() => {
                      router.push(`/customers/${val.id}`);
                    }}
                  >
                    <Td className="cursor-pointer">{val.id}</Td>
                    <Td>{val.Cname}</Td>
                    <Td>{val.Email}</Td>
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

export default CustomerPage;
