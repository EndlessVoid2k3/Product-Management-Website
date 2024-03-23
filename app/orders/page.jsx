"use client";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/sidebar";
import OrderSearchBar from "../../components/OrderSearchBar";
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

const getTotalprice = (products, figures) => {
  let total = 0;
  for (const product of products) {
    total = total + product.count * product.product_id.price;
  }
  for (const figure of figures) {
    total = total + figure.count * figure.product_id.price;
  }
  return total;
};
const dateOption = {
  day: "numeric",
  month: "numeric",
  year: "numeric",
};
const OrderPage = () => {
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
      const response = await axios.get(`http://localhost:8000/other/orders`, {
        withCredentials: true,
        /*  headers: {
          Authorization: `Bearer ${token}`,
        },*/
      });

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
  // console.log(info);
  return (
    <section className="flex bg-secondary-100">
      <Sidebar currentPage="Order" />
      <main className="px-8 py-4 grow flex flex-col h-screen">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-primary text-5xl">Orders</h1>
        </div>
        <OrderSearchBar updateInfo={setInfo}/>
        {info && (
          <TableContainer marginTop={6} overflowY="scroll" maxWidth="100%">
            <Table variant="simple" bgColor={"white"} overflowY={"scroll"}>
              <Thead position="sticky" top={0} bgColor="white">
                <Tr>
                  <Th>RECEIVER</Th>
                  <Th>ORDER DATE</Th>
                  <Th>DELIVERY PRICE</Th>
                  <Th>TOTAL PRICE</Th>
                  <Th>PRODUCT ORDER QUANTITY</Th>
                </Tr>
              </Thead>
              <Tbody>
                {info.map((val, key) => (
                  <Tr
                    className="hover:bg-slate-300 cursor-pointer"
                    key={key}
                    onClick={() => {
                      router.push(`/orders/${val._id}`);
                    }}
                  >
                    <Td className="cursor-pointer">{val.customer.Cname}</Td>
                    <Td className="cursor-pointer">
                      {new Date(val.order_date).toLocaleDateString(
                        "en-GB",
                        dateOption
                      )}
                    </Td>
                    <Td className="cursor-pointer">
                      {val.delivery_price.toLocaleString()}
                    </Td>
                    <Td className="cursor-pointer">
                      {(
                        val.delivery_price +
                        getTotalprice(val.products_book, val.products_figure)
                      ).toLocaleString()}
                    </Td>
                    <Td className="cursor-pointer">{val.quantity}</Td>
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

export default OrderPage;
