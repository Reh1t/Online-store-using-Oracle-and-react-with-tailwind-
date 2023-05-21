import { Table, TableHead, TableBody, TableRow, TableCell, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";

const useStyles = makeStyles({
    tableContainer: {
        maxWidth: '100vw',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    addButton: {
        float: 'topLeft',
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '45px',
    },
});

const SellerSellReport = () => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const sellerid = localStorage.getItem('sellerid');

    const handleFormSubmit = () => {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "Select o.quantity, p.productid, p.sellerid, p.name, p.description, p.brand, p.category, p.quantity, p.price, p.image ,o.orderID,b.buyerid,b.name,o.purchasedate from orders o join products p on o.sellerid=p.sellerid AND o.productid = p.productid AND o.sellerid="+sellerid+" Join buyer b on o.buyerid = b.buyerid"
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
                    setUsers(users);
                }

            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        handleFormSubmit();
    }, []);

    const tableRef = useRef();

    const handlePrint = () => {

        const printWindow = window.open('', 'Print');

        const printContent = document.createElement('div');
        const totalPrice = users.reduce((sum, user) => sum + (user[0] * user[8]), 0);
        const totalItems = users.reduce((sum, user) => sum + (user[0] * 1), 0);
        printContent.innerHTML = `
    <div style="padding: 20px;">
        ${users.length !== 0 ? `
            <table class="${classes.table}" style="border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Sr. No.</b></th>
                        <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Order ID</b></th>
                        <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Name</b></th>
                        <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Description</b></th>
                        <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Brand</b></th>
                        <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Category</b></th>
                        <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Buyer</b></th>
                        <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Rate</b></th>
                        <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Quantity</b></th>
                        <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Price</b></th>
                        <th style="border: 1px solid black; padding: 8px;"><b class="text-black">Timestamp</b></th>
                    </tr>
                </thead>
                <tbody>
                    ${users.map((user, index) => {
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
            <p style="border: 1px solid black; padding: 8px;"><b>Total Orders: </b>${users.length}</p>
            <p style="border: 1px solid black; padding: 8px;"><b>Total Items: </b>${totalItems}</p>
            <p style="border: 1px solid black; padding: 8px;"><b>Total Earning: </b>${Number(totalPrice).toFixed(2)}</p>
        ` : ''}
    </div>
`;

        printWindow.document.body.appendChild(printContent);
        printWindow.print();
        printWindow.close();

    };

    return (
        <div>
          
            <div className="min-h-screen">
                {users.length !== 0 && (
                    <div className={classes.tableContainer}>
                        <Button
                            className={classes.addButton}
                            variant="contained"
                            color="primary"
                            onClick={handlePrint}
                        >
                            Generate Report
                        </Button>

                        <Table className={classes.table} ref={tableRef}>
                            <TableHead className="">
                                <TableRow>
                                    <TableCell><b className="text-black"></b></TableCell>
                                    <TableCell><b className="text-black">Order ID</b></TableCell>
                                    <TableCell><b className="text-black">Name</b></TableCell>
                                    <TableCell><b className="text-black">Rate</b></TableCell>
                                    <TableCell><b className="text-black">Sold to</b></TableCell>
                                    <TableCell><b className="text-black">Quantity</b></TableCell>
                                    <TableCell><b className="text-black">Price</b></TableCell>
                                    <TableCell><b className="text-black">Timestamp</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, index) => {
                                    
                                    if (index % 14 === 0) {
                                        // Skip the first 11 entries for all elements except the first one
                                        if (index !== 0) return null;
                                    }

                                    return (
                                        <TableRow key={user[1]}>
                                            <TableCell>
                                                <img
                                                    src={user[9]}
                                                    className="w-32 ml-16"
                                                />
                                            </TableCell>
                                            <TableCell>{user[10]}</TableCell>
                                            <TableCell>{user[3]}</TableCell>
                                            <TableCell>{Number(user[8]).toFixed(2)}</TableCell>
                                            <TableCell>{user[12]} ({user[11]})</TableCell>
                                            <TableCell>{user[0]}</TableCell>
                                            <TableCell>{Number(user[0] * user[8]).toFixed(2)}</TableCell>
                                            <TableCell>{user[13]}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>

                        </Table>
                    </div>
                )}
            </div>

        
        </div>

    );
};

export default SellerSellReport;
