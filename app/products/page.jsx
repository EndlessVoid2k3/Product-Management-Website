"use client";

import { Button } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import Sidebar from "../../components/sidebar";
import ProductSearchBar from "../../components/ProductSearchBar";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const ProductPage = () => {
  const router = useRouter();
  const [isShowOpt, setIsShowOpt] = useState(false);
  const [info, setInfo] = useState(null);
  const [token, setToken] = useState("");

  //const [error, setError] = useState(null);
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
      const response = await axios.get(`http://localhost:8000/book/`, {
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
    <section
      className="flex bg-secondary-100"
      onClick={(e) => {
        const eleID = e.target?.attributes[0]?.value;
        if (eleID == "genre-input") {
          setIsShowOpt(true);
        } else {
          setIsShowOpt(false);
        }
      }}
    >
      <Sidebar currentPage="Product" />
      <main className="px-8 py-4 grow flex flex-col h-screen">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-primary text-5xl">Products</h1>
          <Button
            bgColor={"#FFD993"}
            _hover={{ bgColor: "#FFA67C" }}
            fontWeight={600}
            onClick={() => {
              router.push("/add-product");
            }}
          >
            Add Product
          </Button>
        </div>

        <ProductSearchBar isShowOpt={isShowOpt} token={token} updateInfo={setInfo}/>

        {/* Table will need an array of objects fetched from api */}
        {info && (
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
                {info.map((val, key) => {
                  return (
                    <Tr
                      className="hover:bg-slate-300 cursor-pointer"
                      key={key}
                      onClick={() => {
                        router.push(`/products/${val.id}`);
                      }}
                    >
                      <Td className="cursor-pointer text-black">{val.id}</Td>
                      <Td
                        className="cursor-pointer"
                        maxWidth="500px"
                        sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                      >
                        {val.name}
                      </Td>
                      <Td className="cursor-pointer">
                        {val.price.toLocaleString()}
                      </Td>
                      <Td className="cursor-pointer">
                        {val.product_count.toLocaleString()}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </main>
    </section>
  );
};

export default ProductPage;
