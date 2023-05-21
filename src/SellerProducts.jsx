import { Table, TableHead, TableBody, TableRow, TableCell, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";

const useStyles = makeStyles({
    tableContainer: {
        maxWidth: '100vw',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
});

const Products = () => {
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
                query: "Select sellerid, ProductID, Name, Category, Brand, Quantity, image, description, Price, list from Products where sellerid=" + sellerid
            })
        })
            .then(res => res.text())
            .then(data => {
                console.log(data);
                if (data.includes(',')) {
                    const userData = data.trim().split(/[;,]/);
                    const users = [];
                    for (let i = 0; i < userData.length; i += 10) {
                        users.push(userData.slice(i, i + 10));
                    }
                    setUsers(users);
                   console.log( users[0][9]);
                   console.log( users[1][9]);
                }

            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        handleFormSubmit();
    }, []);

    function deleteProduct(productId, sellerid) {
        console.log("heell");
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "Update products set sellerid=0, list=0 where sellerid=" + sellerid + " AND productid=" + productId
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

    function listUnlist(ProductID, sellerID, list)
    {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "Update products set list="+list+" where sellerid=" + sellerID + " AND productid=" + ProductID
            })
        })
            .then(res => res.text())
            .then(data => {
                console.log(data);
                if (data == 'successful') {
                    handleFormSubmit();
                }
            })
            .catch(err => console.error(err));
    }

    function editProduct(ProductID, sellerID, name, description, category, brand, quantity, price, image) {

        localStorage.setItem('SPproductid', ProductID);
        const Pproductid = localStorage.getItem('SPproductid');
        console.log(Pproductid);
        localStorage.setItem('SPsellerid', sellerID);
        localStorage.setItem('SPname', name);
        localStorage.setItem('SPdescription', description);
        localStorage.setItem('SPcategory', category);
        localStorage.setItem('SPbrand', brand);
        localStorage.setItem('SPquantity', quantity);
        localStorage.setItem('SPprice', price);
        localStorage.setItem('SPimage', image);

        window.location.href = "/edit-seller-product"
    }

    return (
        <div>
            {users.length !== 0 && (
                <div className={classes.tableContainer}>
                    <Table className={classes.table}>
                        <TableHead className="bg-yellow-500">
                            <TableRow>
                                <TableCell><b className="text-black">ID</b></TableCell>
                                <TableCell><b className="text-black">Name</b></TableCell>
                                <TableCell><b className="text-black">Category</b></TableCell>
                                <TableCell><b className="text-black">Brand</b></TableCell>
                                <TableCell><b className="text-black">Quantity</b></TableCell>
                                <TableCell><b className="text-black">Price</b></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user[0]}>
                                    <TableCell component="th" scope="row">
                                        {user[1]}
                                    </TableCell>
                                    <TableCell>{user[2]}</TableCell>
                                    <TableCell>{user[3]}</TableCell>
                                    <TableCell>{user[4]}</TableCell>
                                    <TableCell>{user[5]}</TableCell>
                                    <TableCell>{user[8]}</TableCell>
                                    <TableCell>
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

export default Products;
