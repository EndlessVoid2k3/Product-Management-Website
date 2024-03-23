"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SidebarOpt from "../utils/sidebarOpt";
import Cookies from "js-cookie";
const Sidebar = ({ currentPage }) => {
  const router = useRouter();
  const logout = () => {
    Cookies.remove("token", { expires: 1 });
    router.push("/login");
  };
  return (
    <div
      id="side-bar"
      className="bg-primary h-screen w-1/5 flex flex-col items-center justify-between py-6 px-5"
    >
      <h2 className="text-4xl font-bold text-white">L&F</h2>

      <ul className="w-full flex flex-col gap-3">
        {/* This is product page */}
        <SidebarOpt
          text="Product"
          curPage={currentPage}
          bgColor={
            currentPage == "Product" ? "bg-secondary-100 font-medium" : ""
          }
          textColor={
            currentPage == "Product" ? "text-primary" : "text-secondary-100"
          }
          link="/products"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path
              fill={currentPage == "Product" ? "#003756" : "#D3EBF3"}
              d="M50.7 58.5L0 160H208V32H93.7C75.5 32 58.9 42.3 50.7 58.5zM240 160H448L397.3 58.5C389.1 42.3 372.5 32 354.3 32H240V160zm208 32H0V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192z"
            />
          </svg>
        </SidebarOpt>

        {/* Order Page */}
        <SidebarOpt
          text="Order"
          bgColor={currentPage == "Order" ? "bg-secondary-100 font-medium" : ""}
          textColor={
            currentPage == "Order" ? "text-primary" : "text-secondary-100"
          }
          link="/orders"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
          >
            <path
              fill={currentPage == "Order" ? "#003756" : "#D3EBF3"}
              d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 192H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
            />
          </svg>
        </SidebarOpt>

        <SidebarOpt
          text="Customer"
          bgColor={
            currentPage == "Customer" ? "bg-secondary-100 font-medium" : ""
          }
          textColor={
            currentPage == "Customer" ? "text-primary" : "text-secondary-100"
          }
          link="/customers"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 320 512"
          >
            <path
              fill={currentPage == "Customer" ? "#003756" : "#D3EBF3"}
              d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152z"
            />
          </svg>
        </SidebarOpt>
      </ul>

      <button
        className="bg-accent2-200 hover:bg-accent1-100 text-white w-full py-3 rounded-md font-semibold"
        onClick={logout}
      >
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;
