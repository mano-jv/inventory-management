import React, {useEffect, useState} from "react";

function Transactions() {
    const [customers, setAllCustomers] = useState([]);
    const [transactions, setAllTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [updatePage, setUpdatePage] = useState(true);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState("");


    useEffect(() => {
        fetchCustomersData();
    }, [updatePage]);


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

    // Fetching Data of Search Products
    const fetchTransactions = (customerId) => {
        fetch(`http://localhost:80/inventory/v1/products/transactions?customerId=${customerId}`, {
            'headers': {
                'Authorization': "Bearer " + sessionStorage.getItem("token")
            }
        }).then((response) => response.json())
            .then((data) => {
                setAllTransactions(data);
            })
            .catch((err) => console.log(err));
    };

    // Handle Page Update
    const handlePageUpdate = () => {
        setUpdatePage(!updatePage);
    };

    //const handleInputChange = (key, value) => {
    //  fetchTransactions(value);
    //setPurchase({ ...purchase, [key]: value });
    //};


    const handleInputChange = (name, value) => {
        if (name === "customerId") {
            setSelectedCustomerId(value);
            fetchTransactions(value)
        }
    };

    const handleSearchInputChange = (e) => {
        const {value} = e.target;
        setSearchTerm(value);

        // Filter customers based on the search term
        const filtered = customers.filter((customer) =>
            customer.name.toLowerCase().startsWith(value.toLowerCase())
        );

        setFilteredCustomers(filtered);
    };

    return (
        <div className="col-span-12 lg:col-span-10  flex justify-center">
            <div className=" flex flex-col gap-5 w-11/12">
                {/* Table  */}
                <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
                    <div className="flex justify-between pt-5 pb-3 px-3">
                        <div className="flex gap-4 justify-center items-center ">
                            <span className="font-bold">Transactions</span>
                            <div className="flex justify-center items-center px-2 border-2 rounded-md">
                                <input
                                    type="text"
                                    placeholder="Search Customers"
                                    value={searchTerm}
                                    onChange={handleSearchInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                            </div>
                            <div>
                                <select
                                    id="customerId"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    name="customerId"
                                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                    value={selectedCustomerId}
                                >
                                    <option value="">Select Customers</option>
                                    {filteredCustomers.map((element) => (
                                        <option key={element.id} value={element.id}>
                                            {element.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                        <thead>
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                Product Name
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                Customer Name
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                Quantity
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                Date
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                Type
                            </th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                        {transactions.map((element, index) => {
                            return (
                                <tr key={element.id}>
                                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                                        {element.productName}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        {element.customerName}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        {element.quantity}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        {element.date}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        {element.billType}
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

export default Transactions;
