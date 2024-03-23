"use client";
import Sidebar from "../../../components/sidebar";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useRouter, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
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
const productsArray = (books, figures) => {
  let total = books.concat(figures);
  return total;
};
const OrderDetail = () => {
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
        `http://localhost:8000/other/orders/${params.orderId}`,
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
      <Sidebar currentPage="Order" />
      <main className="flex-grow px-8 py-4 bg-secondary-100">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-medium">Order Info</h1>
          <button
            onClick={() => {
              router.push("/orders");
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
        <div className="grid grid-cols-12 mt-4 gap-y-4">
          <p className="font-semibold col-span-2">Customer's Name:</p>
          <p className="col-span-10">{info && info.customer.Cname}</p>
          <p className="font-semibold col-span-2">Order's Date:</p>
          <p className="col-span-10">
            {info &&
              new Date(info.order_date).toLocaleDateString("en-GB", dateOption)}
          </p>
          <p className="font-semibold col-span-2">Order Price:</p>
          <p className="col-span-10 flex gap-4">
            {info &&
              (
                info.delivery_price +
                getTotalprice(info.products_book, info.products_figure)
              ).toLocaleString()}
          </p>
          <p className="font-semibold col-span-2">Is Delivered:</p>
          <p className="col-span-10">{info && info.delivered ? "Yes" : "No"}</p>
        </div>
        <h1 className="text-4xl font-medium mt-6">Order List</h1>
        <TableContainer marginTop={6} overflowY="scroll" maxWidth="100%">
          <Table variant="simple" bgColor={"white"} overflowY={"scroll"}>
            <Thead position="sticky" top={0} bgColor="white">
              <Tr>
                <Th>ID</Th>
                <Th>PRODUCT NAME</Th>
                <Th>PRICE</Th>
                <Th>QUANTITY</Th>
              </Tr>
            </Thead>
            <Tbody>
              {info &&
                productsArray(info.products_book, info.products_figure).map(
                  (val, key) => (
                    <Tr className="hover:bg-slate-300 cursor-pointer" key={key}>
                      <Td className="cursor-pointer">{val.product_id.id}</Td>
                      <Td
                        className="cursor-pointer"
                        maxWidth="500px"
                        sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                      >
                        {val.product_id.name}
                      </Td>
                      <Td className="cursor-pointer">
                        {val.product_id.price.toLocaleString()}
                      </Td>
                      <Td className="cursor-pointer">{val.count}</Td>
                    </Tr>
                  )
                )}
            </Tbody>
          </Table>
        </TableContainer>
      </main>
    </section>
  );
};

export default OrderDetail;
