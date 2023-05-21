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

const AdminAccounts = () => {

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

    const [filter, setFilter] = useState('Buyer');

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

    function deleteAccount(ID) {
        console.log("heell");
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "delete from "+filter+" where "+filter+"id = "+ID
            })
        })
            .then(res => res.text())
            .then(data => {
                console.log(data);
                if (data == 'successful') {
                    setUsers([]);
                    handleFormSubmit();
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <div>

            <div className="flex flex-wrap right-0 items-center p-4 bg-gray-100">
                <div className="w-full sm:w-auto mb-2 ml-5">
                    <label htmlFor="filter" className="mr-2">
                        Filter:
                    </label>
                    <select
                        id="filter"
                        className="border rounded-lg p-1 bg-black text-white"
                        value={filter}
                        onChange={handleFilterChange}
                    >
                        <option value="Buyer">Buyer</option>
                        <option value="Seller">Seller</option>
                        <option value="Vendor">Vendor</option>
                    </select>
                </div>



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
                                                onClick={() => deleteAccount(user[0])}
                                                variant="contained" color="primary">Delete</Button>
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

export default AdminAccounts;
