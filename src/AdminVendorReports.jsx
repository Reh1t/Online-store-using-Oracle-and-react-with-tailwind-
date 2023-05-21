import { Table, TableHead, TableBody, TableRow, TableCell, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { SearchIcon } from '@heroicons/react/solid';

const useStyles = makeStyles({
    tableContainer: {
        maxWidth: '100vw',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
});

const AdminVendorReports = () => {

    const customerId = localStorage.getItem('customerid');

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // handle search submit here
        //window.location.href = "/error"

    };

    const [sortOption, setSortOption] = useState('');

    const handleSort = (event) => {
        setSortOption(event.target.value);
    };

    const [filter, setFilter] = useState('Vendor');

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };


    const [query, setQuery] = useState("Select * from "+filter+" order by "+filter+"id asc");

    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const vendorId = localStorage.getItem('vendorid');

    const handleFormSubmit = () => {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: query
            })
        })
            .then(res => res.text())
            .then(data => {
                if (data.includes(',')) {
                    const userData = data.trim().split(/[;,]/);
                    const users = [];
                    for (let i = 0; i < userData.length; i += 7) {
                        users.push(userData.slice(i, i + 7));
                    }
                    setUsers(users);
                }

            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        console.log(query);
        if(searchTerm==='')
        {
            setQuery("Select * from "+filter+" order by "+filter+"id asc")
        }
        else
        {
            setQuery("Select * from "+filter+" where ("+filter+"id like ('%"+searchTerm+"%') or name like ('%"+searchTerm+"%') or email like ('%"+searchTerm+"%') or CNIC like ('%"+searchTerm+"%') or contact like ('%"+searchTerm+"%') or address like ('%"+searchTerm+"%')) order by "+filter+"id asc")
        }

    }, [searchTerm]);

    useEffect(() => {
        console.log(query);
        setQuery("Select * from "+filter+" order by "+filter+"id asc");
    }, [filter]);

    useEffect(() => {
        console.log(query);
        setUsers([]);
        handleFormSubmit();
    }, [query]);

    const [users1, setUsers1] = useState([]);

    function printReport()
    {
        if(users1[0].length>=1)
        {
  

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
                        <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Sr. No.</b></th>
                        <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Order ID</b></th>
                        <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Name</b></th>
                        <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Description</b></th>
                        <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Brand</b></th>
                        <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Category</b></th>
                        <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Seller</b></th>
                        <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Rate</b></th>
                        <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Quantity</b></th>
                        <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Price</b></th>
                        <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Timestamp</b></th>
                    </tr>
                </thead>
                <tbody>
                    ${users1.map((user, index) => {
            if (index % 14 === 0 && index !== 0) {
                return '';
            }

            return `
                            <tr>
                                <td style="border: 1px solid black; padding: 8px;">${index + 1}</td>
                                <td style="border: 1px solid black; padding: 8px;">${user[10]}</td>
                                <td style="border: 1px solid black; padding: 8px;">${user[3]}</td>
                                <td style="border: 1px solid black; padding: 8px;">${user[4]}</td>
                                <td style="border: 1px solid black; padding: 8px;">${user[5]}</td>
                                <td style="border: 1px solid black; padding: 8px;">${user[6]}</td>
                                <td style="border: 1px solid black; padding: 8px;">${user[12]} (${user[11]})</td>
                                <td style="border: 1px solid black; padding: 8px;">${Number(user[8]).toFixed(2)}</td>
                                <td style="border: 1px solid black; padding: 8px;">${user[0]}</td>
                                <td style="border: 1px solid black; padding: 8px;">${Number(user[0] * user[8]).toFixed(2)}</td>
                                <td style="border: 1px solid black; padding: 8px;">${user[13]}</td>
                            </tr>
                        `;
        }).join('')}
                </tbody>
            </table>
            <p style="border: 1px solid black; padding: 8px;"><b>Total Orders: </b>${users1.length}</p>
            <p style="border: 1px solid black; padding: 8px;"><b>Total Items: </b>${totalItems}</p>
            <p style="border: 1px solid black; padding: 8px;"><b>Total Earning: </b>${Number(totalPrice).toFixed(2)}</p>
        ` : ''}
    </div>
`;

        printWindow.document.body.appendChild(printContent);
        printWindow.print();
        printWindow.close();

       
        }
    }

    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        console.log("iiiiiii");
         if (hasMounted) {
             console.log(query);
             printReport();
           } else {
             setHasMounted(true);
           }
     }, [users1]);

    function GenerateReport(VendorID)
    {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "Select o.quantity, p.productid, p.vendorid, p.name, p.description, p.brand, p.category, p.quantity, p.price, p.image,o.orderID,o.sellerid,s.name,o.purchasedate from sellerorders o join stock p on o.vendorid=p.vendorid AND o.productid = p.productid AND o.vendorid="+VendorID+" Join seller s on o.sellerid = s.sellerid"
            })
        })
            .then(res => res.text())
            .then(data => {
                if (data.includes(',')) {
                    const userData = data.trim().split(/[;,]/);
                    const users = [];
                    for (let i = 0; i < userData.length; i += 14) {
                        users.push(userData.slice(i, i + 14));
                    }
                    if(userData.length >2)
                    {
                       setUsers1(users);
                    }
                }

            })
            .catch(err => console.error(err));
    }

    return (
        <div>

            <div className="flex flex-wrap right-0 items-center p-4 bg-gray-100">

            <h1 className="text-lg ml-3 text-slate-500 font-bold mb-4">Vendor Reports</h1>

                <nav className="w-full sm:w-auto mb-2 ml-5">
                    {/* other navbar content */}
                    <form onSubmit={handleSearchSubmit} className="flex items-center relative">
                        <input
                            type="text"
                            placeholder="User Details"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="ml-2 px-3 py-1 rounded border border-gray-300 pl-8"
                        />
                        <SearchIcon className="pl-2 h-5 w-5 absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400" />
                    </form>
                </nav>
            </div>
            {users.length !== 0 && (
                <div className={classes.tableContainer}>
                    <Table className={classes.table}>
                        <TableHead className="bg-yellow-500">
                            <TableRow>
                                <TableCell><b className="text-black">ID</b></TableCell>
                                <TableCell><b className="text-black">Name</b></TableCell>
                                <TableCell><b className="text-black">Email</b></TableCell>
                                <TableCell><b className="text-black">CNIC</b></TableCell>
                                <TableCell><b className="text-black">Contact</b></TableCell>
                                <TableCell><b className="text-black">Address</b></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user[0]}>
                                    <TableCell component="th" scope="row">
                                        {user[0]}
                                    </TableCell>
                                    <TableCell>{user[1]}</TableCell>
                                    <TableCell>{user[2]}</TableCell>
                                    <TableCell>{user[4]}</TableCell>
                                    <TableCell>{user[5]}</TableCell>
                                    <TableCell>{user[6]}</TableCell>
                                    <TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => GenerateReport(user[0])}
                                                variant="contained" color="primary">Generate</Button>
                                        </TableCell>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>

    );
};

export default AdminVendorReports;
