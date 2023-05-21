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
  const vendorId = localStorage.getItem('vendorid');

  const handleFormSubmit = () => {
    fetch('http://localhost:5000/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "Select VendorID, ProductID, Name, Category, Brand, Quantity, image, description, Price from Stock where vendorid="+vendorId
      })
    })
    .then(res => res.text())
    .then(data => {
      if(data.includes(','))
      {
        const userData = data.trim().split(/[;,]/);
      const users = [];
      for (let i = 0; i < userData.length; i += 9) {
        users.push(userData.slice(i, i + 9));
      }
      setUsers(users);
      }

    })
    .catch(err => console.error(err));
  };
  
  useEffect(() => {
    handleFormSubmit();
  }, []);

  function deleteProduct ( productId , vendorId)
  {
    console.log("heell");
    fetch('http://localhost:5000/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "Update stock set vendorid=0, list=0 where vendorid="+vendorId+" AND productid="+productId
      })
    })
    .then(res => res.text())
    .then(data => {
      console.log(data);
       if(data == 'successful')
       {
           setUsers([]);
           handleFormSubmit();
       }
    })
    .catch(err => console.error(err));
  }

  function editProduct (ProductID, VendorID, name, description, category, brand, quantity, price, image)
  {
       
      localStorage.setItem('Pproductid', ProductID);
      const Pproductid =localStorage.getItem('Pproductid');
      console.log(Pproductid);
      localStorage.setItem('Pvendorid', VendorID);
      localStorage.setItem('Pname', name);
      localStorage.setItem('Pdescription', description);
      localStorage.setItem('Pcategory', category);
      localStorage.setItem('Pbrand', brand);
      localStorage.setItem('Pquantity', quantity);
      localStorage.setItem('Pprice', price);
      localStorage.setItem('Pimage', image);

      window.location.href="/edit-product"
  }

  return (
    <div>
    {users.length !== 0 &&(
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
