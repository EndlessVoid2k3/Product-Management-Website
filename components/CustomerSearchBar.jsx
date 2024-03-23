import { Input, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
const CustomerSearchBar = ({ onDatFromChild }) => {
  const [closeAdvancedFilter, setCloseAdvancedFilter] = useState(true);
  const [form, setForm] = useState({});

  const filterData = async () => {
    const response = await axios.get(
      `http://localhost:8000/other/filterCustomers?name=${form.searchKey}&mail=${form.email}&phone=${form.phone}`
    );

    onDatFromChild(response.data);
  };

  return (
    <div className="w-full relative">
      <div id="product-search" className="flex mt-6">
        <div
          onClick={() => {
            setCloseAdvancedFilter((old) => !old);
          }}
          className="cursor-pointer w-56 bg-primary text-secondary-100 font-semibold flex flex-row gap-2 items-center px-3 rounded-s-md"
        >
          <img src="/filter.svg" alt="" />
          <p className="cursor-pointer">Advanced Filter</p>
        </div>
        <Input
          bgColor="white"
          borderRadius="none"
          variant="outline"
          placeholder="Search Customer's Order"
          onChange={(e) => {
            setForm((old) => {
              if (e.target.value == "") {
                delete old.searchKey;
                return { ...old };
              }
              return {
                ...old,
                searchKey: e.target.value,
              };
            });
          }}
        />
        <Button
          borderTopLeftRadius={0}
          borderBottomLeftRadius={0}
          bgColor="#003756"
          _hover=""
          color="#D3EBF3"
          onClick={filterData}
        >
          Search
        </Button>
      </div>
      <div
        id="advanced-filter"
        className={`z-10 w-full bg-primary absolute rounded-md px-10  ${
          closeAdvancedFilter
            ? "h-0 p-0 transition-all"
            : "transition-all h-80 py-8"
        }`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            filterData();
          }}
          action=""
          className={`flex flex-col justify-between gap-5 h-full ${
            closeAdvancedFilter ? "hidden" : ""
          }`}
        >
          <div className="grid grid-cols-2">
            <div>
              <div>
                <label htmlFor="" className="font-medium text-secondary-100">
                  Email
                </label>
                <Input
                  bgColor="white"
                  className="mt-1"
                  type="email"
                  onChange={(e) => {
                    setForm((old) => {
                      if (e.target.value == "") {
                        delete old.email;
                        return { ...old };
                      }
                      return {
                        ...old,
                        email: e.target.value,
                      };
                    });
                  }}
                />
              </div>

              <div className="flex flex-col mt-4 gap-1">
                <label htmlFor="" className="text-secondary-100 font-medium">
                  Phone Number
                </label>
                <Input
                  bgColor="white"
                  className="mt-1"
                  type="text"
                  onChange={(e) => {
                    setForm((old) => {
                      if (e.target.value == "") {
                        delete old.phone;
                        return { ...old };
                      }
                      return {
                        ...old,
                        phone: e.target.value,
                      };
                    });
                  }}
                />
              </div>
            </div>
            <div></div>
          </div>

          <div className="flex justify-center gap-3">
            <Button size="sm" colorScheme="red">
              Reset
            </Button>
            <Button size="sm" colorScheme="messenger" type="submit">
              Apply
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerSearchBar;
