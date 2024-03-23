"use client";

import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MultivaluesAutocomplete from "@/components/MultivaluesAutocomplete";
import {
  FormControl,
  FormLabel,
  Select,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
const AddProduct = () => {
  const toast = useToast();
  const router = useRouter();
  const [newProduct, setNewProduct] = useState({});
  const [isShowOpt, setShowOpt] = useState(false);
  const [genre, setGenre] = useState([]);
  // console.log(newProduct);
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
      return new Promise(resolve => {
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
  const getGenre = async () => {
    const res = await axios.get("http://localhost:8000/book/genre", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const genreList = res.data;
    // console.log(genreList);
    setGenre(genreList);
  };
  useEffect(() => {
    const fetchDataAndCheckAuth = async () => {
      try {
        // Wait for checkAuth to complete
        await checkAuth();

        // After checkAuth is done, proceed with getGenre
        await getGenre();
      } catch (error) {
        console.error("Error during checkAuth or fetchData:", error);
      }
    };

    fetchDataAndCheckAuth();
  }, []);

  const handleSubmit = async e => {
    try {
      if (newProduct.type === "LN" && newProduct.genre.length === 0) {
        console.log("The genre must have value");
        return;
      }

      if (newProduct.type === "LN") {
        const response = axios.post(
          "http://localhost:8000/book/create",
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
        // console.log(response);
        toast({
          title: "Product Added",
          description: "New Product added to the database",
          status: "success",
          position: "bottom-right",
          duration: 4000,
          isClosable: true,
        });
        router.push("/products");
      } else if (newProduct.type === "FG") {
        const response = axios.post(
          "http://localhost:8000/figure/create",
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
        // console.log(response);
        toast({
          title: "Product Added",
          description: "New Product added to the database",
          status: "success",
          position: "bottom-right",
          duration: 4000,
          isClosable: true,
        });
        router.push("/products");
      }
    } catch (error) {
      // console.log(error);
      toast({
        title: "Product Add Fail",
        description: "Something went wrong, check your action again",
        status: "error",
        position: "bottom-right",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  return (
    <section
      className="flex"
      onClick={e => {
        const eleID = e.target?.attributes[0]?.value;
        if (eleID == "genre-input") {
          setShowOpt(true);
        } else {
          setShowOpt(false);
        }
      }}
    >
      <Sidebar currentPage={"Product"} />
      <main className="px-8 py-4 flex-grow bg-secondary-100">
        <h1 className="font-bold text-5xl text-primary">Add Product</h1>
        <form
          action=""
          onSubmit={e => {
            e.preventDefault();
          }}
          className="mt-10 flex flex-col gap-4 w-10/12 mx-auto"
          autoComplete="off"
        >
          <div className="flex gap-2">
            <FormControl sx={{ width: "25%" }}>
              <FormLabel>Product Type</FormLabel>
              <Select
                bgColor="white"
                placeholder="Choose option"
                name="type"
                required
                onInput={e => {
                  setNewProduct(old => ({
                    ...old,
                    [e.target.name]: e.target.value,
                  }));
                }}
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
                required
                onChange={e => {
                  setNewProduct(old => ({
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
                required
                onChange={e => {
                  setNewProduct(old => ({
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
                required
                onChange={e => {
                  setNewProduct(old => ({
                    ...old,
                    [e.target.name]: e.target.value,
                  }));
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Quantity</FormLabel>
              <Input
                type="number"
                bgColor="white"
                name="quantity"
                required
                onChange={e => {
                  setNewProduct(old => ({
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
                required
                onChange={e => {
                  setNewProduct(old => ({
                    ...old,
                    [e.target.name]: e.target.value,
                  }));
                }}
              />
            </FormControl>
          </div>
          <FormControl>
            {newProduct.type == "LN" ? (
              <>
                <label className="font-medium">Genre</label>
                <MultivaluesAutocomplete
                  label="Type/Genre"
                  options={genre}
                  isShowOpt={isShowOpt}
                  prevForm={newProduct}
                  onUpdateForm={setNewProduct}
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
                  required
                  placeholder="Figure Type"
                  onInput={e => {
                    setNewProduct(old => {
                      delete old.genre;
                      return {
                        ...old,
                        [e.target.name]: e.target.value,
                      };
                    });
                  }}
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
            <Button
              onClick={() => {
                handleSubmit();
              }}
              colorScheme="green"
            >
              Submit
            </Button>
          </div>
        </form>
      </main>
    </section>
  );
};

export default AddProduct;
