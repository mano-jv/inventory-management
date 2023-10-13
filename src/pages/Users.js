import React, { useState, useEffect, useContext } from "react";
import AddUser from "../components/users/AddUser";
import UpdateUser from "../components/users/UpdateUser";
import debounce from 'lodash/debounce';

function Users() {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateUser, setUpdateUser] = useState([]);
  const [users, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatePage, setUpdatePage] = useState(true);


  useEffect(() => {
    fetchUsersData();
  }, [updatePage]);

  const debouncedHandleSearchTerm = debounce((value) => {
    fetchSearchData(value);
    console.log(value);
  }, 1000);

  // Fetching Data of All Users
  const fetchUsersData = () => {
    fetch(`https://ims-fnb5.onrender.com/inventory/v1/users`, {
      'headers': {
        'Authorization': "Bearer " + sessionStorage.getItem("token")
      }
    }).then((response) => response.json())
      .then((data) => {
        setAllUsers(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching Data of Search Users
  const fetchSearchData = (searchTerm) => {
    fetch(`https://ims-fnb5.onrender.com/inventory/v1/users?name=${searchTerm}`, {
      'headers': {
        'Authorization': "Bearer " + sessionStorage.getItem("token")
      }
    }).then((response) => response.json())
      .then((data) => {
        setAllUsers(data);
      })
      .catch((err) => console.log(err));
  };

  // Modal for User ADD
  const addUserModalSetting = () => {
    setShowUserModal(!showUserModal);
  };

  // Modal for User UPDATE
  const updateUserModalSetting = (selectedUserData) => {
    console.log("Clicked: edit");
    setUpdateUser(selectedUserData);
    setShowUpdateModal(!showUpdateModal);
  };


  // Delete item
  const deleteItem = (id) => {
    console.log("User ID: ", id);
    fetch(`https://ims-fnb5.onrender.com/inventory/v1/users/${id}`, {
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
        {showUserModal && (
          <AddUser
            addUserModalSetting={addUserModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}
        {showUpdateModal && (
          <UpdateUser
            updateUserData={updateUser}
            updateModalSetting={updateUserModalSetting}
          />
        )}

        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Users</span>
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
                onClick={addUserModalSetting}
              >
                {/* <Link to="/inventory/add-product">Add Product</Link> */}
                Add User
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  User Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  User Type
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {users.map((element, index) => {
                return (
                  <tr key={element.id}>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.username}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.userType}
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

export default Users;
