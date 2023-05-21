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

const SellerRacks = () => {

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

    function loadCategoriesForRequests() {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "Select name from category where name not in (Select category from racks where sellerid= " + sellerid + ") AND name not in (Select category from rackrequests where sellerid= " + sellerid + ")"
            })
        })
            .then(res => res.text())
            .then(data => {
                console.log(data);
                const userData = data.trim().split(/[;,]/);
                // const users = [];
                // for (let i = 0; i < userData.length; i++) {
                //     users.push(use);
                // }
                setCR(userData);

            })
            .catch(err => console.error(err));
    }

    function loadMyRequests() {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "Select * from rackRequests where sellerid=" + sellerid
            })
        })
            .then(res => res.text())
            .then(data => {
                const userData = data.trim().split(/[;,]/);
                const users = [];
                if(userData.length >2)
                {
                for (let i = 0; i < userData.length; i += 4) {
                    users.push(userData.slice(i, i + 4));
                }

                    setRequests(users);
            }
                
         
            })
            .catch(err => console.error(err));

    }

    function loadMyCapacityRequests() {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "Select * from requestcapacity where sellerid=" + sellerid
            })
        })
            .then(res => res.text())
            .then(data => {
                const userData = data.trim().split(/[;,]/);
                const users = [];
                if(userData.length >2)
                {
                for (let i = 0; i < userData.length; i += 4) {
                    users.push(userData.slice(i, i + 4));
                }

                    setCapacityRequests(users);
            }
                
         
            })
            .catch(err => console.error(err));

    }


    function loadMyCategories() {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "Select category from racks where sellerid=" + sellerid
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

    function AllFunctions()
    {
        console.log("I am called")
        setRequests([]);
        setCapacityRequests([]);
        loadCategoriesForRequests();
        loadMyRequests();
        loadMyCapacityRequests();
        loadMyCategories();
        handleFormSubmit();
    }

    useEffect(() => {
       AllFunctions();
    }, []);


    function RequestSpace() {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "Insert Into rackrequests values(rackRequestSeq.nextval,"+sellerid+",'"+Rcategory+"',"+Rquantity+")"
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

    function RequestCapacity() {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "Insert Into requestcapacity values(RequestCapacitySeq.nextval,"+sellerid+",'"+category+"',"+quantity+")"
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


    function DeleteRequest(RequestID) {
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

    function DeleteCapacityRequest(RequestID) {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "delete from requestcapacity where requestid = " + RequestID
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

    return (
        <div>
            <div>
                <div className="container mx-auto p-6 bg-gray-100">
                    <h1 className="text-2xl font-bold mb-4">Request Rack</h1>
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
                                {cr.map(category => (
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
                                Quantity:
                            </label>
                            <input
                                id="quantity"
                                type="number"
                                value={Rquantity}
                                onChange={(e) => setRQuantity(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                                min={1}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={() => RequestSpace()}
                            >
                                Request Rack
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="ml-3">
                <h1 className="text-lg ml-3 text-slate-500 font-bold mb-4">My Requests</h1>
                {requests.length >0 && (
                      <React.Fragment key={requests.length}>
                    <div className={classes.tableContainer}>
                        <Table className={classes.table}>
                            <TableHead className="">
                                <TableRow>
                                    <TableCell><b className="text-black">Request ID</b></TableCell>
                                    <TableCell><b className="text-black">Category</b></TableCell>
                                    <TableCell><b className="text-black">Quantity</b></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {requests.map((user) => (
                                    <TableRow key={user[0]}>
                                        <TableCell component="th" scope="row">
                                            {user[0]}
                                        </TableCell>
                                        <TableCell>{user[2]}</TableCell>
                                        <TableCell>{user[3]}</TableCell>

                                        <TableCell>
                                            <button
                                                onClick={() => DeleteRequest(user[0])}
                                                className="text-sm bg-white text-red-500 border-red-500 border-2 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white">Cancel Request</button>
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
            <div>
                <div className="container mx-auto p-6 bg-gray-100">
                    <h1 className="text-2xl font-bold mb-4">Request Capacity</h1>
                    <form className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                        <div className="mb-4">
                            <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
                                Category
                            </label>
                            <select
                                id="category"
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
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
                                Quantity:
                            </label>
                            <input
                                id="quantity"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                                min={1}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={() => RequestCapacity()}
                            >
                                Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="ml-3">
                <h1 className="text-lg ml-3 text-slate-500 font-bold mb-4">My Requests</h1>
                {capacityRequests.length >0 && (
                      <React.Fragment key={requests.length}>
                    <div className={classes.tableContainer}>
                        <Table className={classes.table}>
                            <TableHead className="">
                                <TableRow>
                                    <TableCell><b className="text-black">Request ID</b></TableCell>
                                    <TableCell><b className="text-black">Category</b></TableCell>
                                    <TableCell><b className="text-black">Quantity</b></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {capacityRequests.map((user) => (
                                    <TableRow key={user[0]}>
                                        <TableCell component="th" scope="row">
                                            {user[0]}
                                        </TableCell>
                                        <TableCell>{user[2]}</TableCell>
                                        <TableCell>{user[3]}</TableCell>

                                        <TableCell>
                                            <button
                                                onClick={() => DeleteCapacityRequest(user[0])}
                                                className="text-sm bg-white text-red-500 border-red-500 border-2 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white">Cancel Request</button>
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
                <h1 className="text-lg ml-3 font-bold mb-4">My Racks</h1>
                {users.length !== 0 && (
                    <div className={classes.tableContainer}>
                        <Table className={classes.table}>
                            <TableHead className="">
                                <TableRow>
                                    <TableCell><b className="text-black">Rack ID</b></TableCell>
                                    <TableCell><b className="text-black">Category</b></TableCell>
                                    <TableCell><b className="text-black">Capcity</b></TableCell>
                                    <TableCell><b className="text-black">Occupied</b></TableCell>
                                    <TableCell><b className="text-black">Available</b></TableCell>
                                    {/* <TableCell></TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user[0]}>
                                        <TableCell component="th" scope="row">
                                            {user[0]}
                                        </TableCell>
                                        <TableCell>{user[2]}</TableCell>
                                        <TableCell>{user[3]}</TableCell>
                                        <TableCell>{user[4]}</TableCell>
                                        <TableCell>{user[3] - user[4]}</TableCell>
                                        {/* <TableCell>
                                        <TableCell>

                                          

                                                {user[9] == 1 ? (
                                                    <Button
                                                        onClick={() => listUnlist(user[1], user[0], 0)}
                                                        variant="contained"
                                                        color="secondary"
                                                    >
                                                        Unlist
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        onClick={() => listUnlist(user[1], user[0], 1)}
                                                        variant="contained"
                                                        style={{backgroundColor: "#8bc34a"}}
                                                    >
                                                        List
                                                    </Button>
                                                )}

                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => editProduct(user[1], user[0], user[2], user[7], user[3], user[4], user[5], user[8], user[6])}
                                                variant="contained">Edit</Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => deleteProduct(user[1], user[0])}
                                                variant="contained" color="primary">Delete</Button>
                                        </TableCell>
                                    </TableCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </div>

    );
};

export default SellerRacks;
