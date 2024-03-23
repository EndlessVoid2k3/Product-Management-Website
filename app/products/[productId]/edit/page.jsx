"use client";

import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import MultivaluesAutocomplete from "@/components/MultivaluesAutocomplete";
import {
  FormControl,
  FormLabel,
  Select,
  Input,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
const EditProduct = () => {
  const router = useRouter();
  const params = useParams();
  const [newProduct, setNewProduct] = useState({});
  const [isShowOpt, setShowOpt] = useState(false);
  const [genre, setGenre] = useState();
  const [loading, setLoading] = useState(true);
  //console.log(newProduct);
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
  const getInfoProducts = async () => {
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
        setNewProduct((old) => {
          return {
            type: response.data.id.indexOf("LN") != -1 ? "LN" : "FG",
            name: response.data.name,
            size: response.data.size,
            provider: response.data.provider.name,
            quantity: response.data.product_count,
            price: response.data.price,
            genre: response.data.genre,
          };
        });
        setLoading(false);
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
        setNewProduct((old) => {
          return {
            type: response.data.id.indexOf("LN") != -1 ? "LN" : "FG",
            name: response.data.name,
            size: response.data.size,
            provider: response.data.provider.name,
            quantity: response.data.product_count,
            price: response.data.price,
            figureType: response.data.type,
          };
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const editProd = async () => {
    try {
      if (params.productId.indexOf("LN") != -1) {
        const response = await axios.put(
          `http://localhost:8000/book/${params.productId}`,
          {
            name: newProduct.name,
            genre: newProduct.genre,
            size: newProduct.size,
            price: newProduct.price,
            product_count: newProduct.quantity,
            provider: newProduct.provider,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        router.push(`/products/${params.productId}`);
      } else {
        const response = await axios.put(
          `http://localhost:8000/figure/${params.productId}`,
          {
            name: newProduct.name,
            type: newProduct.figureType,
            size: newProduct.size,
            price: newProduct.price,
            product_count: newProduct.quantity,
            provider: newProduct.provider,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        router.push(`/products/${params.productId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getGenre = async () => {
    const res = await axios.get("http://localhost:8000/book/genre", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const genreList = res.data;
    setGenre(genreList);
  };
  useEffect(() => {
    const fetchDataAndCheckAuth = async () => {
      try {
        // Wait for checkAuth to complete
        await checkAuth();

        // After checkAuth is done, proceed with fetchData
        await getGenre();
        await getInfoProducts();
      } catch (error) {
        console.error("Error during checkAuth or fetchData:", error);
      }
    };

    fetchDataAndCheckAuth();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e);
  }
  console.log(newProduct);
  return (
    <section
      className="flex"
      onClick={(e) => {
        const eleID = e.target?.attributes[0]?.value;
        if (eleID == "genre-input") {
          setShowOpt(true);
        } else {
          setShowOpt(false);
        }
      }}
    >
      <Sidebar currentPage={"Product"} />
      {!loading && (
        <main className="px-8 py-4 flex-grow bg-secondary-100">
          <h1 className="font-bold text-5xl text-primary">Edit Product</h1>
          <form
            action=""
            className="mt-10 flex flex-col gap-4 w-10/12 mx-auto"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="flex gap-2">
              <FormControl sx={{ width: "25%" }}>
                <FormLabel>Product Type</FormLabel>
                <Select
                  bgColor="white"
                  placeholder="Choose option"
                  name="type"
                  value={newProduct.type}
                  onInput={(e) => {
                    setNewProduct((old) => ({
                      ...old,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                  disabled
                >
                  <option value="LN">Light Novel</option>
                  <option value="FG">Figure</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Product Name</FormLabel>
                <Input
                  type="text"
                  bgColor="white"
                  name="name"
                  value={newProduct.name}
                  onChange={(e) => {
                    setNewProduct((old) => ({
                      ...old,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
              </FormControl>
            </div>
            <div className="flex gap-2">
              <FormControl sx={{ width: "60%" }}>
                <FormLabel>Size</FormLabel>
                <Input
                  type="text"
                  bgColor="white"
                  name="size"
                  value={newProduct.size}
                  onChange={(e) => {
                    setNewProduct((old) => ({
                      ...old,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Provider</FormLabel>
                <Input
                  type="text"
                  bgColor="white"
                  name="provider"
                  value={newProduct.provider}
                  onChange={(e) => {
                    setNewProduct((old) => ({
                      ...old,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                  disabled
                />
              </FormControl>
              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input
                  type="number"
                  bgColor="white"
                  name="quantity"
                  value={newProduct.quantity}
                  onChange={(e) => {
                    setNewProduct((old) => ({
                      ...old,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  bgColor="white"
                  name="price"
                  value={newProduct.price}
                  onChange={(e) => {
                    setNewProduct((old) => ({
                      ...old,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
              </FormControl>
            </div>
            <FormControl>
              {newProduct.type !== "" && newProduct.type == "LN" ? (
                <>
                  <label className="font-medium">Genre</label>
                  <MultivaluesAutocomplete
                    options={genre}
                    isShowOpt={isShowOpt}
                    prevForm={newProduct}
                    onUpdateForm={setNewProduct}
                    defaultOpt={newProduct.genre}
                  />
                </>
              ) : (
                <>
                  <label className="font-medium">Type</label>
                  <Select
                    maxWidth="25%"
                    bgColor="white"
                    mt={2}
                    name="figureType"
                    placeholder="Figure Type"
                    value={newProduct.figureType}
                    onInput={(e) => {
                      setNewProduct((old) => {
                        delete old.genre;
                        return {
                          ...old,
                          [e.target.name]: e.target.value,
                        };
                      });
                    }}
                    disabled
                  >
                    <option value="Nendoroid">Nendoroid</option>
                    <option value="Figure">Figure</option>
                  </Select>
                </>
              )}
            </FormControl>
            <div className="flex justify-end gap-2">
              <Button
                colorScheme="red"
                onClick={() => {
                  router.push("/products");
                }}
              >
                Cancel
              </Button>
              <Button type="submit" colorScheme="green" onClick={editProd}>
                Submit
              </Button>
            </div>
          </form>
        </main>
      )}
    </section>
  );
};

export default EditProduct;
