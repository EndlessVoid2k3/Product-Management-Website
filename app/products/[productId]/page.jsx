"use client";

import Sidebar from "../../../components/sidebar";
import { Button, Tag, useToast } from "@chakra-ui/react";
import { useRouter, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const ProductDetail = () => {
  const toast = useToast();
  const router = useRouter();
  const [info, setInfo] = useState(null);
  const params = useParams();
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
      if (params.productId.indexOf("LN") != -1) {
        const response = await axios.get(
          `http://localhost:8000/book/${params.productId}`,
          {
            withCredentials: true,
            /*  headers: {
          Authorization: `Bearer ${token}`,
        },*/
          }
        );
        setInfo(response.data);
      } else {
        const response = await axios.get(
          `http://localhost:8000/figure/${params.productId}`,
          {
            withCredentials: true,
            /*  headers: {
          Authorization: `Bearer ${token}`,
        },*/
          }
        );
        setInfo(response.data);
      }
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

  const deleteProducts = async () => {
    try {
      if (params.productId.indexOf("LN") != -1) {
        const response = await axios.delete(
          `http://localhost:8000/book/${params.productId}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        router.push("/products");
      } else {
        const response = await axios.delete(
          `http://localhost:8000/figure/${params.productId}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        router.push("/products");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Cannot Delete Product",
        description:
          "You cannot delete this product because it is being referenced",
        status: "error",
        duration: 1500,
        position: "bottom-right",
        isClosable: true,
      });
    }
  };
  console.log(info);

  const checkGenreorType = (info) => {
    if (info.genre) {
      return info.genre;
    }
    if (info.type) return info.type;
    return [];
  };

  return (
    <section className="w-full flex">
      <Sidebar currentPage="Product" />
      <main className="flex-grow px-8 py-4 bg-secondary-100">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-medium max-w-4xl">
            {info && info.name}
          </h1>
          <button
            onClick={() => {
              router.push("/products");
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
          <p className="font-semibold">Provider:</p>
          <p className="col-span-11">{info && info.provider.name}</p>
          <p className="font-semibold">Size:</p>
          <p className="col-span-11">{info && info.size}</p>
          <p className="font-semibold">Genre/Type:</p>
          <div className="col-span-11 flex gap-4">
            {info && info.genre ? (
              info.genre.map((val, key) => (
                <Tag size="lg" key={key}>
                  {val}
                </Tag>
              ))
            ) : (
              <Tag size="lg">{info && info.type}</Tag>
            )}
          </div>
          <p className="font-semibold">Quantity:</p>
          <p className="col-span-11">
            {info && info.product_count.toLocaleString()}
          </p>
        </div>
        <Button
          className="mt-4"
          colorScheme="yellow"
          onClick={() => router.push(`/products/${info.id}/edit`)}
        >
          Edit
        </Button>
        <Button
          className="ml-4 mt-4"
          colorScheme="red"
          onClick={deleteProducts}
        >
          Delete
        </Button>
      </main>
    </section>
  );
};

export default ProductDetail;
