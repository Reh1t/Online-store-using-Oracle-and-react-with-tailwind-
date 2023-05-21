import { Table, TableHead, TableBody, TableRow, TableCell, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import React from 'react';


const useStyles = makeStyles({
    tableContainer: {
        maxWidth: '100vw',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
});

const AdminReports = () => {

    
    const [selectedDate, setSelectedDate] = useState("");

    const classes = useStyles();

    const [category, setCategory] = useState('Total Sale of Each Product');
    const [category1, setCategory1] = useState('Products Listed to Each Category');

    const [users1, setUsers1] = useState([]);

    function printFunction1() {
        if (users1[0].length > 1) {
            const printWindow = window.open('', 'Print');

            const printContent = document.createElement('div');
            const totalPrice = users1.reduce((sum, user) => sum + (user[0] * user[8]), 0);
            const totalItems = users1.reduce((sum, user) => sum + (user[0] * 1), 0);
            printContent.innerHTML = `
       <div style="padding: 20px;">
           ${users1.length !== 0 ? `
               <table class="${classes.table}" style="border-collapse: collapse;">
                   <thead>
                       <tr>
                           <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Sr no.</b></th>
                           <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Category</b></th>
                           <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Quantity</b></th>
                       </tr>
                   </thead>
                   <tbody>
                       ${users1.map((user, index) => {
                if (index % 3 === 0 && index !== 0) {
                    console.log(user[0]);
                    return '';
                }

                return `
                               <tr>
                                   <td style="border: 1px solid black; padding: 8px;">${index + 1}</td>
                                   <td style="border: 1px solid black; padding: 8px;">${user[0]}</td>
                                   <td style="border: 1px solid black; padding: 8px;">${user[1]}</td>
                               </tr>
                           `;
            }).join('')}
                   </tbody>
               </table>
           ` : ''}
       </div>
   `;
 
            printWindow.document.body.appendChild(printContent);
            printWindow.print();
            printWindow.close();
        }
    }

    const [hasMounted1, setHasMounted1] = useState(false);

    useEffect(() => {
        console.log("iiiiiii");
        if (hasMounted1) {
           printFunction1();
        } else {
            setHasMounted1(true); 
        } 
    }, [users1]);

    function function1() {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "SELECT p1.CATEGORY, COUNT(p1.productid) FROM products p1 GROUP BY p1.CATEGORY HAVING COUNT(p1.productid) >= 0"
            })
        })
            .then(res => res.text())
            .then(data => {
                if (data.includes(',')) {
                    const userData = data.trim().split(/[;,]/);
                    const users = [];
                    for (let i = 0; i < userData.length; i += 2) {
                        users.push(userData.slice(i, i + 2));
                    }
                    if (userData.length > 1) {
                        console.log(userData.length)
                        setUsers1(users);
                    }
                }

            })
            .catch(err => console.error(err));
    }

    const [users2, setUsers2] = useState([]);

    function printFunction2() {
        if (users2[0].length > 2) {
            const printWindow = window.open('', 'Print');

            const printContent = document.createElement('div');
            const totalPrice = users2.reduce((sum, user) => sum + (user[0] * user[8]), 0);
            const totalItems = users2.reduce((sum, user) => sum + (user[0] * 1), 0);
            printContent.innerHTML = `
       <div style="padding: 20px;">
           ${users2.length !== 0 ? `
               <table class="${classes.table}" style="border-collapse: collapse;">
                   <thead>
                       <tr>
                           <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Sr no.</b></th>
                           <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Product ID</b></th>
                           <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Quantity Sold</b></th>
                           <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Total Price</b></th>
                       </tr>
                   </thead>
                   <tbody>
                       ${users2.map((user, index) => {
                if (index % 3 === 0 && index !== 0) {
                    return '';
                }

                return `
                               <tr>
                                   <td style="border: 1px solid black; padding: 8px;">${index + 1}</td>
                                   <td style="border: 1px solid black; padding: 8px;">${user[0]}</td>
                                   <td style="border: 1px solid black; padding: 8px;">${user[1]}</td>
                                   <td style="border: 1px solid black; padding: 8px;">${user[2]}</td>
                               </tr>
                           `;
            }).join('')}
                   </tbody>
               </table>
           ` : ''}
       </div>
   `;

            printWindow.document.body.appendChild(printContent);
            printWindow.print();
            printWindow.close();
        }
    }

    const [hasMounted2, setHasMounted2] = useState(false);

    useEffect(() => {
        console.log("iiiiiii");
        if (hasMounted2) {
            printFunction2();
        } else {
            setHasMounted2(true);
        }
    }, [users2]);

    function function2() {

        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "SELECT o.PRODUCTID, SUM(o.quantity), SUM(price) FROM orders o JOIN products p ON p.PRODUCTID = o.PRODUCTID AND p.sellerID=o.sellerID GROUP BY o.PRODUCTID HAVING COUNT(DISTINCT o.orderID) >=1"
            })
        })
            .then(res => res.text())
            .then(data => {
                if (data.includes(',')) {
                    const userData = data.trim().split(/[;,]/);
                    const users = [];
                    for (let i = 0; i < userData.length; i += 3) {
                        users.push(userData.slice(i, i + 3));
                    }
                    if (userData.length > 2) {
                        setUsers2(users);
                    }
                }

            })
            .catch(err => console.error(err));

    }

    const [users3, setUsers3] = useState([]);

    function printFunction3() {
        if (users3[0].length > 2) {
            const printWindow = window.open('', 'Print');

            const printContent = document.createElement('div');
            const totalPrice = users3.reduce((sum, user) => sum + (user[0] * user[8]), 0);
            const totalItems = users3.reduce((sum, user) => sum + (user[0] * 1), 0);
            printContent.innerHTML = `
       <div style="padding: 20px;">
           ${users3.length !== 0 ? `
               <table class="${classes.table}" style="border-collapse: collapse;">
                   <thead>
                       <tr>
                           <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Sr no.</b></th>
                           <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Order ID</b></th>
                           <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Product Name</b></th>
                           <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Seller Name</b></th>
                           <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Buyer ID</b></th>
                           <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Quantity</b></th>
                           <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Date</b></th>
                       </tr>
                   </thead>
                   <tbody>
                       ${users3.map((user, index) => {
                if (index % 6 === 0 && index !== 0) {
                    return '';
                }

                return `
                               <tr>
                                   <td style="border: 1px solid black; padding: 8px;">${index + 1}</td>
                                   <td style="border: 1px solid black; padding: 8px;">${user[0]}</td>
                                   <td style="border: 1px solid black; padding: 8px;">${user[1]}</td>
                                   <td style="border: 1px solid black; padding: 8px;">${user[2]}</td>
                                   <td style="border: 1px solid black; padding: 8px;">${user[3]}</td>
                                   <td style="border: 1px solid black; padding: 8px;">${user[4]}</td>
                                   <td style="border: 1px solid black; padding: 8px;">${user[5]}</td>
                               </tr>
                           `;
            }).join('')}
                   </tbody>
               </table>
           ` : ''}
       </div>
   `;

            printWindow.document.body.appendChild(printContent);
            printWindow.print();
            printWindow.close();
        }
    }

    const [hasMounted3, setHasMounted3] = useState(false);

    useEffect(() => {
        console.log("iiiiiii");
        if (hasMounted3) {
            printFunction3();
        } else {
            setHasMounted3(true);
        }
    }, [users3]);

    function function3() {
        if(selectedDate !== '')
        {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "select o.orderid,p.name,s.name,o.BUYERID,o.QUANTITY,o.PURCHASEDATE from ORDERS o join products p on o.PRODUCTID = p.PRODUCTID join seller s on s.SELLERID = o.SELLERID where PURCHASEDATE like '%"+selectedDate+"%' group by o.orderid,p.name,s.name,o.BUYERID,o.QUANTITY,o.PURCHASEDATE"
            })
        })
            .then(res => res.text())
            .then(data => {
                if (data.includes(',')) {
                    const userData = data.trim().split(/[;,]/);
                    const users = [];
                    for (let i = 0; i < userData.length; i += 6) {
                        users.push(userData.slice(i, i + 6));
                    }
                    if (userData.length > 2) {
                        setUsers3(users);
                    }
                }

            })
            .catch(err => console.error(err));
        }
    }




    const handleDateClick = (date) => {
      setSelectedDate(date);
    };
  
    const daysInMonth = (month, year) => {
      return new Date(year, month, 0).getDate();
    };
  
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
    const handlePrevMonthClick = () => {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    };
  
    const handleNextMonthClick = () => {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    };
  
    const daysInCurrentMonth = daysInMonth(currentMonth + 1, currentYear);


    return (
        <div>
            <div className="mx-auto p-6 bg-gray-100 flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold mb-4">Customized Reports</h1>
                <form className="flex">



                    <div>
                        <input
                            id="quantity"
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="shadow appearance-none border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            disabled
                            
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => function2()}
                        >
                            Generate
                        </button>
                    </div>
                </form>
                <form className="flex mt-5 mb-5">



                    <div>
                        <input
                            id="quantity"
                            type="text"
                            value={category1}
                            onChange={(e) => setCategory1(e.target.value)}
                            className="shadow appearance-none border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            disabled
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => function1()}
                        >
                            Generate
                        </button>
                    </div>
                </form>
                
            </div>

      

            <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl text-gray-500 font-bold mt-5 mb-4">Sales on a date (Customer - Seller)</h1>
      <div className="flex justify-center items-center w-full mb-6">
        <button className="mr-4" onClick={handlePrevMonthClick}>
          &lt; {monthNames[currentMonth === 0 ? 11 : currentMonth - 1]}
        </button>
        <h1 className="text-3xl font-bold">
          {monthNames[currentMonth]} {currentYear}
        </h1>
        <button className="ml-4" onClick={handleNextMonthClick}>
          {monthNames[currentMonth === 11 ? 0 : currentMonth + 1]} &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {Array(daysInCurrentMonth)
          .fill()
          .map((_, index) => {
            const date = new Date(currentYear, currentMonth, index + 1);
            const dateString = `${currentYear}-${(currentMonth + 1)
              .toString()
              .padStart(2, "0")}-${(index + 1).toString().padStart(2, "0")}`;
            return (
              <button
                key={index}
                className={`py-2 px-3 rounded-full ${
                  selectedDate === dateString
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
                onClick={() => handleDateClick(dateString)}
              >
                {index + 1}
              </button>
            );
          })}
      </div>
      {/* {selectedDate && (
        <p className="text-xl font-semibold mt-6">
          Selected date: {selectedDate}
        </p>
      )} */}
    </div>

    <form className="flex mt-5 mb-5 justify-center items-center">



                    <div>
                        <input
                            id="quantity"
                            type="text"
                            value={selectedDate}
                           // onChange={(e) => setCategory2(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            disabled
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => function3()}
                        >
                            Generate
                        </button>
                    </div>
                </form>
        </div>

    );
};

export default AdminReports;
