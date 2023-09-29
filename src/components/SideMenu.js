import React from "react";
import { Link } from "react-router-dom";

function SideMenu() {
  const localStorageData = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="h-full flex-col justify-between  bg-white hidden lg:flex ">
      <div className="px-4 py-6">
        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/users">
                <div className="flex items-center gap-2">
                  <img
                      alt="customers-icon"
                      src={require("../assets/inventory-icon.png")}
                  />
                  <span className="text-sm font-medium"> Users </span>
                </div>
              </Link>
            </summary>
          </details>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/customers">
                <div className="flex items-center gap-2">
                  <img
                    alt="customers-icon"
                    src={require("../assets/inventory-icon.png")}
                  />
                  <span className="text-sm font-medium"> Customers </span>
                </div>
              </Link>
            </summary>
          </details>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/inventory">
                <div className="flex items-center gap-2">
                  <img
                    alt="inventory-icon"
                    src={require("../assets/inventory-icon.png")}
                  />
                  <span className="text-sm font-medium"> Inventory </span>
                </div>
              </Link>
            </summary>
          </details>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/generate-bill">
                <div className="flex items-center gap-2">
                  <img
                      alt="inventory-icon"
                      src={require("../assets/order-icon.png")}
                  />
                  <span className="text-sm font-medium"> Generate Bill </span>
                </div>
              </Link>
            </summary>
          </details>

          <Link
            to="/products"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <img
              alt="purchase-icon"
              src={require("../assets/supplier-icon.png")}
            />
            <span className="text-sm font-medium"> Products</span>
          </Link>
          <Link
              to="/transactions"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <img
                alt="purchase-icon"
                src={require("../assets/supplier-icon.png")}
            />
            <span className="text-sm font-medium"> Transactions</span>
          </Link>
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <div className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
          <img
            alt="Profile"
            src={require("../assets/person.jfif")}
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <p className="text-xs">
              <strong className="block font-medium">
                {localStorageData.username?.toUpperCase()}
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
