import React, {useEffect, useState} from "react";

function Transactions() {
    const [customers, setAllCustomers] = useState([]);
    const [transactions, setAllTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState(customers);
    const [selectedCustomerId, setSelectedCustomerId] = useState("");


    useEffect(() => {
        fetchCustomersData();
    }, []);


    const fetchCustomersData = () => {
        fetch(`http://localhost:80/inventory/v1/customers`, {
            'headers': {
                'Authorization': "Bearer " + sessionStorage.getItem("token")
            }
        }).then((response) => response.json())
            .then((data) => {
                setAllCustomers(data);
                setFilteredCustomers(data);
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

    const handleFetchTransaction = () => {
        if (selectedCustomerId) {
            fetchTransactions(selectedCustomerId);
        }
    };

    const handleCustomerSelect = (event) => {
        const selectedCustomerId = event.target.value;
        setSelectedCustomerId(selectedCustomerId);
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
                                <input type="text" list="customerId" placeholder="Search Customers" onChange={handleCustomerSelect}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                                <datalist id ="customerId">
                                    {
                                        filteredCustomers.map((element) => (
                                            <option key={element.id} value={element.id}>
                                                {element.name}
                                            </option>
                                        ))
                                    }

                                </datalist>
                                <button onClick={handleFetchTransaction}>Fetch Transaction</button>
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
