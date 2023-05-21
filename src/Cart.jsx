import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

function Cart() {

  const customerId = localStorage.getItem('customerid');

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: "SELECT p.productid, p.image, p.name, s.sellerid, s.name AS seller_name, p.price FROM products p INNER JOIN cart c ON p.productid = c.productid INNER JOIN seller s ON p.sellerid = s.sellerid WHERE c.customerid = " + customerId + ""
          })
        });
        const data = await response.text();
        const userData = data.trim().split(/[;,]/);
        const products = [];
        for (let i = 0; i < userData.length; i += 6) {
          products.push(userData.slice(i, i + 6));
        }
        setProducts(products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  function ProductPage(ProductID, SellerID) {
    localStorage.setItem('productid', ProductID);
    localStorage.setItem('sellerid', SellerID);
    window.location.href = "/product-page";
  }

  const ProductCard = ({ ProductID, Image, Name, SellerID, Seller, Price }) => {
    if (Price >= 0) {
      return (
        <div className="bg-gray-100 rounded-lg shadow-md">


          {/* Product image */}
          <div className="relative mb-[20px]">

            <img src={Image} alt="Product 1" className="w-full h-auto mb-[20px] rounded-tr-lg rounded-tl-lg" />


          </div>

          <div className="p-[20px]">
            {/* Product price */}
            <h2 className="text-lg font-bold text-slate-900 mb-[10px]">Price: ${Price}</h2>

            <h2 className="text-md text-slate-900 mb-[10px]">{Name}</h2>

            {/* Product description */}
            <p className="text-gray-500 mb-[20px]">Sold by: {Seller}</p>

            {/* Add to cart button */}
            <button
              onClick={() => ProductPage(ProductID, SellerID)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Order</button>
          </div>


        </div>


      );
    }
  };


  return (
    <div>
      <Header />
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-5">Shopping Cart</h1>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              // key={user[0]}
              ProductID={product[0]}
              Image={product[1]}
              Name={product[2]}
              SellerID={product[3]}
              Seller={product[4]}
              Price={product[5]}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;