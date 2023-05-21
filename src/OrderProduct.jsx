import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const ProductPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('Thankyou for purchasing');

  const [quantity, setQuantity] = useState(1);
  const [users, setUsers] = useState([]);
  const productID = localStorage.getItem('productid');
  const sellerId = localStorage.getItem('sellerid');
  const CustomerId = localStorage.getItem('customerid');
  const product = {
    name: 'Product Name',
    image: 'https://dummyimage.com/600x400/000/fff',
    price: 19.99,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non velit sit amet ex dapibus aliquam. Donec sed commodo mi, id interdum nisi. Aliquam vel gravida elit, eu semper quam. Mauris sagittis rhoncus tortor, in aliquet nisl finibus quis. Etiam euismod lorem velit, vel bibendum sapien suscipit a.'
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  function updateProductQuantity()
  {
    fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "Update products set quantity = quantity - "+quantity+" where productid = "+productID+" AND sellerid = "+sellerId
            })
        })
            .then(res => res.text())
            .then(data => {
              if(data == 'successful')
              {
                //product buy ho gayi
                if(!isOpen)
                {
                  setIsOpen(!isOpen);
                }
                console.log("product buy ho gayi");
              }
                
            })
            .catch(err => console.error(err));
  }

  const [date, setDate] = useState('');

  const handleBuyNow = () => {

    fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "INSERT INTO orders (orderid, productid, sellerid, buyerid, quantity, PurchaseDate) SELECT OrderSeq.nextval, "+productID+", "+sellerId+", "+CustomerId+", "+quantity+", TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') FROM dual WHERE EXISTS (SELECT 1 FROM products WHERE productid = "+productID+" AND sellerid = "+sellerId+" AND quantity >= "+quantity+")"
            })
        })
            .then(res => res.text())
            .then(data => {
              if(data == 'successful')
              {
                updateProductQuantity();
              }
                
            })
            .catch(err => console.error(err));
    
  };


  useEffect(() => {
    fetch('http://worldtimeapi.org/api/timezone/Asia/Karachi')
    .then(response => response.json())
    .then(data => {setDate(data.datetime);
      });

  }, []);

  useEffect(() => {

    console.log(date);
  
    const handleFormSubmit = () => {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "Select image, name, price, description, quantity from Products where sellerid="+sellerId+" AND productid="+productID
            })
        })
            .then(res => res.text())
            .then(data => {
                const userData = data.trim().split(/[;,]/);
                const users = [];
                for (let i = 0; i < userData.length; i += 5) {
                    users.push(userData.slice(i, i + 5));
                }
                setUsers(users);

            })
            .catch(err => console.error(err));
    };

    handleFormSubmit();
}, [date]);

const handleToggle = () => {
  setIsOpen(!isOpen);
};

  return (
    <div>
        <Header />
        {users.length !== 0 && (
    <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-4 py-8 bg-gray-100 pt-16 pb-16">
      <div className="w-full md:w-1/2">
        <img src={users[0][0]} alt={product.name} className="w-full h-auto" />
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{users[0][1]}</h1>
        <p className="text-gray-600 mb-4">{users[0][3]}</p>
        <p className="text-gray-800 text-2xl font-bold mb-4">${users[0][2]}</p>
        <div className="flex flex-row items-center mb-4">
          <label htmlFor="quantity" className="mr-4">
            Quantity:
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            className="border-gray-400 border-2 rounded-md px-4 py-2 w-20 text-gray-800 font-bold"
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
          />
        </div>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      </div>
    </div>
)}
 <div className="fixed bottom-0 right-0 m-4" style={{ position: 'fixed' }}>

{isOpen && (
  <div className="bg-gray-200 rounded p-4 absolute bottom-0 right-0 mb-4" style={{ width: '400px' }}>
  <button
    className="float-right text-gray-500 hover:text-gray-600"
    onClick={handleToggle}
  >
    X
  </button>
  <p className="text-gray-700">{message}</p>
</div>
)}
</div>
    <Footer />
    </div>
  );
};

export default ProductPage;
