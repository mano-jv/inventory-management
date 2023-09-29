import React, { useState, useEffect, useContext } from "react";
import AddPurchaseDetails from "../components/AddPurchaseDetails";
import ReturnPurchaseDetails from "../components/ReturnPurchaseDetails";
import AuthContext from "../AuthContext";

function Products() {
  const [showPurchaseModal, setPurchaseModal] = useState(false);
  const [showReturnPurchaseModal, setShowReturnPurchaseModal] = useState(false);
  const [products, setAllProducts] = useState([]);
  const [customers, setAllCustomers] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchProductsData();
    fetchCustomersData();
  }, [updatePage]);


  // Fetching Data of All Products
  const fetchProductsData = () => {
    fetch(`http://localhost:80/inventory/v1/products`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    }).then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  };

  const fetchCustomersData = () => {
    fetch(`http://localhost:80/inventory/v1/customers`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    }).then((response) => response.json())
        .then((data) => {
          setAllCustomers(data);
        })
        .catch((err) => console.log(err));
  };

  // Modal for Sale Add
  const addSaleModalSetting = () => {
    setPurchaseModal(!showPurchaseModal);
  };

  const handleReturnPurchaseModal = () => {
    setShowReturnPurchaseModal(!showReturnPurchaseModal);
  };

  
  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        {showPurchaseModal && (
          <AddPurchaseDetails
            addSaleModalSetting={addSaleModalSetting}
            products={products}
            customers={customers}
            handlePageUpdate={handlePageUpdate}
            authContext = {authContext}
          />
        )}
        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Products</span>
            </div>
            <div className="flex gap-3">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addSaleModalSetting}
              >
                {/* <Link to="/inventory/add-product">Add Product</Link> */}
                Add Purchase
              </button>
            </div>
            <div className="flex gap-4">
              <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                  onClick={handleReturnPurchaseModal}
              >
                Return Purchase
              </button>
            </div>
            {showReturnPurchaseModal && (
                <ReturnPurchaseDetails
                    addSaleModalSetting={handleReturnPurchaseModal}
                    products={products}
                    customers={customers}
                    handlePageUpdate={handlePageUpdate}
                    authContext = {authContext}
                />
            )}
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Product Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Product Code
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Product Price
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Product Quantity
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {products.map((element, index) => {
                return (
                  <tr key={element.id}>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.code}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.price}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.quantity}
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

export default Products;
