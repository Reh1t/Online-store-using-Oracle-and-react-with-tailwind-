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

const AdminRacks = () => {

    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [Rquantity, setRQuantity] = useState('');
    const [Rcategory, setRCategory] = useState('');

    const [cr, setCR] = useState([]);
    const [mc, setMC] = useState([]);

    const [requests, setRequests] = useState([]);
    const [capacityRequests, setCapacityRequests] = useState([]);

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
                query: "Select * from racks where sellerid =" + sellerid
            })
        })
            .then(res => res.text())
            .then(data => {
                console.log(data);
                if (data.includes(',')) {
                    const userData = data.trim().split(/[;,]/);
                    const users = [];
                    for (let i = 0; i < userData.length; i += 5) {
                        users.push(userData.slice(i, i + 5));
                    }
                    setUsers(users);
                    console.log(users[0][9]);
                    console.log(users[1][9]);
                }

            })
            .catch(err => console.error(err));
    };


    function loadRequests() {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "Select * from rackRequests"
            })
        })
            .then(res => res.text())
            .then(data => {
                const userData = data.trim().split(/[;,]/);
                const users = [];
                if (userData.length > 2) {
                    for (let i = 0; i < userData.length; i += 4) {
                        users.push(userData.slice(i, i + 4));
                    }

                    setRequests(users);
                }


            })
            .catch(err => console.error(err));

    }

    function loadCapacityRequests() {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "Select * from requestcapacity"
            })
        })
            .then(res => res.text())
            .then(data => {
                const userData = data.trim().split(/[;,]/);
                const users = [];
                if (userData.length > 2) {
                    for (let i = 0; i < userData.length; i += 4) {
                        users.push(userData.slice(i, i + 4));
                    }

                    setCapacityRequests(users);
                }


            })
            .catch(err => console.error(err));

    }


    function loadCategories() {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "Select name from category"
            })
        })
            .then(res => res.text())
            .then(data => {
                const userData = data.trim().split(/[;,]/);
                console.log(userData);
                setMC(userData);
            })
            .catch(err => console.error(err));

    }

    function AllFunctions() {
        console.log("I am called")
        setRequests([]);
        setCapacityRequests([]);
        loadRequests();
        loadCapacityRequests();
        loadCategories();
        handleFormSubmit();
    }

    useEffect(() => {
        AllFunctions();
    }, []);


    function AddCategory() {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "Insert into category values(categorySeq.nextval,'"+category+"')"
            })
        })
            .then(res => res.text())
            .then(data => {
                console.log(data);
                if (data == 'successful') {
                    setCategory('');
                    AllFunctions();
                }
            })
            .catch(err => console.error(err));
    }

    function RejectRequest(RequestID) {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "delete from rackrequests where requestid = " + RequestID
            })
        })
            .then(res => res.text())
            .then(data => {
                console.log(data);
                if (data == 'successful') {
                    AllFunctions();
                }
            })
            .catch(err => console.error(err));
    }

    function AcceptRequest(RequestID, SellerID, Category, Quantity) {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "Insert Into racks values(rackseq.nextval,"+SellerID+",'"+Category+"',"+Quantity+",0)"
            })
        })
            .then(res => res.text())
            .then(data => {
                console.log(data);
                if (data == 'successful') {
                    RejectRequest(RequestID);
                }
            })
            .catch(err => console.error(err));
    }


    function RejectCapacityRequest(RequestID) {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "delete from requestCapacity where requestid = " + RequestID
            })
        })
            .then(res => res.text())
            .then(data => {
                console.log(data);
                if (data == 'successful') {
                    AllFunctions();
                }
            })
            .catch(err => console.error(err));
    }

    function AcceptCapacityRequest(RequestID, SellerID, Category, Quantity) {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "Update racks set totalCapacity=totalCapacity+"+Quantity+" where sellerid="+SellerID+" AND Category='"+Category+"'"
            })
        })
            .then(res => res.text())
            .then(data => { 
                console.log(data);
                if (data == 'successful') {
                    RejectCapacityRequest(RequestID);
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <div className="container mx-auto p-6 bg-gray-100">
                    <h1 className="text-2xl font-bold mb-4">Categories</h1>
                    <form className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                        <div className="mb-4">
                            <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
                                Category
                            </label>
                            <select
                                id="category"
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={Rcategory}
                                onChange={e => setRCategory(e.target.value)}
                            >
                                <option value="">Select a category</option>
                                {mc.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="quantity"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                New Category
                            </label>
                            <input
                                id="quantity"
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={() => AddCategory()}
                            >
                                Add Category
                            </button>
                        </div>
                    </form>
                </div>
            <div className="ml-3 mt-6">
                <h1 className="text-lg ml-3 text-slate-500 font-bold mb-4">Rack Allocation Requests</h1>
                {requests.length > 0 && (
                    <React.Fragment key={requests.length}>
                        <div className={classes.tableContainer}>
                            <Table className={classes.table}>
                                <TableHead className="">
                                    <TableRow>
                                        <TableCell><b className="text-black">Request ID</b></TableCell>
                                        <TableCell><b className="text-black">Seller ID</b></TableCell>
                                        <TableCell><b className="text-black">Category</b></TableCell>
                                        <TableCell><b className="text-black">Quantity</b></TableCell>
                                        <TableCell></TableCell>
                                          <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {requests.map((user) => (
                                        <TableRow key={user[0]}>
                                            <TableCell component="th" scope="row">
                                                {user[0]}
                                            </TableCell>
                                            <TableCell>{user[1]}</TableCell>
                                            <TableCell>{user[2]}</TableCell>
                                            <TableCell>{user[3]}</TableCell>

                                            
                                                <TableCell>
                                                    <button
                                                        onClick={() => AcceptRequest(user[0],user[1],user[2],user[3])}
                                                        className="text-sm bg-white text-green-500 border-green-500 border-2 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white">Accept</button>
                                                </TableCell>
                                                <TableCell>
                                                    <button
                                                        onClick={() => RejectRequest(user[0])}
                                                        className="text-sm bg-white text-red-500 border-red-500 border-2 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white">Reject</button>
                                                </TableCell>
                                           

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </React.Fragment>
                )}
            </div>
            <div className="bg-blue-500 h-4 mb-6"></div>

            <div className="ml-3">
                <h1 className="text-lg ml-3 text-slate-500 font-bold mb-4">Rack Capacity Requests</h1>
                {capacityRequests.length > 0 && (
                    <React.Fragment key={requests.length}>
                        <div className={classes.tableContainer}>
                            <Table className={classes.table}>
                                <TableHead className="">
                                    <TableRow>
                                        <TableCell><b className="text-black">Request ID</b></TableCell>
                                        <TableCell><b className="text-black">Seller ID</b></TableCell>
                                        <TableCell><b className="text-black">Category</b></TableCell>
                                        <TableCell><b className="text-black">Quantity</b></TableCell>
                                        <TableCell></TableCell>
                                          <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {capacityRequests.map((user) => (
                                        <TableRow key={user[0]}>
                                            <TableCell component="th" scope="row">
                                                {user[0]}
                                            </TableCell>
                                            <TableCell>{user[1]}</TableCell>
                                            <TableCell>{user[2]}</TableCell>
                                            <TableCell>{user[3]}</TableCell>

                                            
                                                <TableCell>
                                                    <button
                                                        onClick={() => AcceptCapacityRequest(user[0],user[1],user[2],user[3])}
                                                        className="text-sm bg-white text-green-500 border-green-500 border-2 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white">Accept</button>
                                                </TableCell>
                                                <TableCell>
                                                    <button
                                                        onClick={() => RejectCapacityRequest(user[0])}
                                                        className="text-sm bg-white text-red-500 border-red-500 border-2 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white">Reject</button>
                                                </TableCell>
                                           

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </React.Fragment>
                )}
            </div>
            <div className="bg-blue-500 h-4 mb-6"></div>
        </div>

    );
};

export default AdminRacks;
