import React, {useEffect, useState} from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function PdfGenerator() {
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        // Fetch the list of customers from the /customers endpoint
        axios.get('http://localhost:80/inventory/v1/customers', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        })
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error('Error fetching customer data:', error);
            });
    }, []);

    const generateBill = () => {
        // Fetch the JSON data for bills associated with the selected customer
        axios.get(`http://localhost:80/inventory/v1/products/bill?customerId=${selectedCustomer}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        }).then(response => {
            // Ensure the response matches the expected structure (bills and total)
            if (response.data && Array.isArray(response.data.bills) && typeof response.data.total === 'number') {
                //setData(response.data);
                generatePdf(response.data);
            } else {
                console.error('Invalid response format for bills data:', response.data);
            }
        }).catch(error => {
            console.error('Error fetching bill data:', error);
        });
    };

    const generatePdf = (responseData) => {
        if (responseData) {
            // Create a new PDF document
            const doc = new jsPDF();

            // Add content to the PDF
            doc.text('Bill Data', 10, 10);
            doc.autoTable({
                startY: 20,
                head: [['Product Name', 'Customer Name', 'Quantity', 'Price', 'Date', 'Bill Type']],
                body: responseData.bills.map(bill => [
                    bill.productName,
                    bill.customerName,
                    bill.quantity,
                    bill.price,
                    bill.date,
                    bill.billType,
                ]),
            });
            doc.setFontSize(12);
            doc.text(`Total: Rs${responseData.total}`, 10, doc.autoTable.previous.finalY + 10);

            // Save the PDF as a file or open in a new tab
            doc.save('bills.pdf');
        }
    };

    const handleSelectChange = event => {
        setSelectedCustomer(event.target.value);
    };

    return (<div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Generate PDF from JSON Data</h1>
            <label className="block mb-2">
                Select Customer:
                <select
                    className="border rounded p-2"
                    value={selectedCustomer}
                    onChange={handleSelectChange}
                >
                    <option value="">Select a customer</option>
                    {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                            {customer.name}
                        </option>
                    ))}
                </select>
            </label>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={generateBill}
            >
                Generate PDF
            </button>
        </div>
    );
}

export default PdfGenerator;
