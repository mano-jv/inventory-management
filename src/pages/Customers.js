import React, { useState, useEffect, useContext } from "react";
import AddCustomer from "../components/customers/AddCustomer";
import UpdateCustomer from "../components/customers/UpdateCustomer";
import AuthContext from "../AuthContext";
import debounce from 'lodash/debounce';

function Customers() {
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateCustomer, setUpdateCustomer] = useState([]);
  const [customers, setAllCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchCustomersData();
  }, [updatePage]);

  const debouncedHandleSearchTerm = debounce((value) => {
    fetchSearchData(value);
    console.log(value);
  }, 1000);

  // Fetching Data of All Customers
  const fetchCustomersData = () => {
    fetch(`http://localhost:80/inventory/v1/customers`, {
      'headers': {
        'Authorization': "Bearer " + sessionStorage.getItem("token")
      }
    }).then((response) => response.json())
      .then((data) => {
        setAllCustomers(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching Data of Search customers
  const fetchSearchData = (searchTerm) => {
    fetch(`http://localhost:80/inventory/v1/customers?name=${searchTerm}`, {
      'headers': {
        'Authorization': "Bearer " + sessionStorage.getItem("token")
      }
    }).then((response) => response.json())
      .then((data) => {
        setAllCustomers(data);
      })
      .catch((err) => console.log(err));
  };

  // Modal for Customer ADD
  const addCustomerModalSetting = () => {
    setShowCustomerModal(!showCustomerModal);
  };

  // Modal for Customer UPDATE
  const updateCustomerModalSetting = (selectedCustomerData) => {
    console.log("Clicked: edit");
    setUpdateCustomer(selectedCustomerData);
    setShowUpdateModal(!showUpdateModal);
  };


  // Delete item
  const deleteItem = (id) => {
    console.log("Customer ID: ", id);
    fetch(`http://localhost:80/inventory/v1/customers/${id}`, {
      'method': 'DELETE',
      'headers': {
        'Authorization': "Bearer " + sessionStorage.getItem("token")
      }
    }).then((response) => response.json())
      .then((data) => {
        setUpdatePage(!updatePage);
      });
  };

  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  // Handle Search Term
  const handleSearchTerm = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    // Call the debounced function with the updated value
    debouncedHandleSearchTerm(value);
  };

  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        {showCustomerModal && (
          <AddCustomer
            addCustomerModalSetting={addCustomerModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}
        {showUpdateModal && (
          <UpdateCustomer
            updateCustomerData={updateCustomer}
            updateModalSetting={updateCustomerModalSetting}
          />
        )}

        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Customers</span>
              <div className="flex justify-center items-center px-2 border-2 rounded-md ">
                <img
                  alt="search-icon"
                  className="w-5 h-5"
                  src={require("../assets/search-icon.png")}
                />
                <input
                  className="border-none outline-none focus:border-none text-xs"
                  type="text"
                  placeholder="Search here"
                  value={searchTerm}
                  onChange={handleSearchTerm}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addCustomerModalSetting}
              >
                {/* <Link to="/inventory/add-product">Add Product</Link> */}
                Add Customer
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Customer Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Customer Code
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Contact Number
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {customers.map((element, index) => {
                return (
                  <tr key={element.id}>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.code}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.phoneNumber}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <span
                        className="text-green-700 cursor-pointer"
                        onClick={() => updateCustomerModalSetting(element)}
                      >
                        Edit{" "}
                      </span>
                      <span
                        className="text-red-600 px-2 cursor-pointer"
                        onClick={() => deleteItem(element.id)}
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Customers;
