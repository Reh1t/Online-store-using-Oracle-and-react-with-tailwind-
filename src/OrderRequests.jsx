import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

function OrderRequests() {

    const vendorId = localStorage.getItem('vendorid');

    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: "SELECT s.productid, s.vendorid, s.name, s.description, s.brand, s.category, s.quantity, s.price, s.image, t.sellerid,t.quantity,se.name,t.Requestid FROM trade t JOIN stock s ON s.productid = t.productid AND s.vendorid = t.vendorid join seller se on se.sellerid = t.sellerid WHERE t.vendorid = " + vendorId
                })
            });
            const data = await response.text();
            const userData = data.trim().split(/[;,]/);
            const products = [];
            for (let i = 0; i < userData.length; i += 13) {
                products.push(userData.slice(i, i + 13));
            }
            setProducts(products);
        } catch (error) {
            console.error(error);
        }
    };

    const [date, setDate] = useState('');

    useEffect(() => {

        fetch('http://worldtimeapi.org/api/timezone/Asia/Karachi')
      .then(response => response.json())
      .then(data => {setDate(data.datetime);
        });
        
        fetchProducts();
    }, []);

    //   function ProductPage(ProductID, SellerID) {
    //     localStorage.setItem('productid', ProductID);
    //     localStorage.setItem('sellerid', SellerID);
    //     window.location.href = "/product-page";
    //   }

    function update(VendorID, ProductID, RequestQuantity, RequestID, SellerID) {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "Begin AcceptTradeRequest("+RequestID+","+RequestQuantity+","+VendorID+","+ProductID+","+SellerID+",TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS')); END;"
            })
        })
            .then(res => res.text())
            .then(data => {
                console.log(data);
                fetchProducts();
                
            })
            .catch(err => console.error(err));
    }

    function AcceptRequest(VendorID, ProductID, RequestQuantity, RequestID, SellerID) {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "Select productid, vendorid, name, description, brand, category, quantity, price, image from stock where vendorid = "+VendorID+" AND productid = "+ProductID+" AND Quantity >= "+RequestQuantity
            })
        })
            .then(res => res.text())
            .then(data => {
                console.log(data);
                if (data.includes(',')) {
                    //console.log(date);
                    update(VendorID, ProductID, RequestQuantity, RequestID, SellerID);
                }
                else {

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
                query: "Delete from trade where requestid = " + RequestID
            })
        })
            .then(res => res.text())
            .then(data => {
                console.log(data);
                if (data == 'successful') {
                    fetchProducts();
                }
            })
            .catch(err => console.error(err));
    }

    const ProductCard = ({ ProductID, VendorID, Category, Image, Name, Brand, Description, Quantity, Price, SellerID, RequestQuantity, SellerName, RequestID }) => {
        if (Price >= 0) {
            return (
                <div className="bg-gray-100 rounded-lg shadow-md">


                    {/* Product image */}
                    <div className="relative mb-[20px]">

                        <img src={Image} alt="Product 1" className="w-full h-auto mb-[20px] rounded-tr-lg rounded-tl-lg" />


                    </div>

                    <div className="p-[20px]">
                        {/* Product price */}
                        <p className="text-gray-500"><b>Request ID </b> {RequestID}</p>
                        <h2 className="text-lg font-bold text-slate-900 mb-[10px]">Price: ${(+Price).toFixed(2)}</h2>

                        <h2 className="text-md text-slate-900 mb-[10px]">{Name}</h2>

                        {/* Product description */}
                        <p className="text-gray-500"><b>From:</b> {SellerName} ({SellerID})</p>
                        <p className="text-gray-500 mb-[20px]"><b>Pcs:</b> {RequestQuantity}</p>

                        {/* Add to cart button */}
                        <button
                            onClick={() => AcceptRequest(VendorID, ProductID, RequestQuantity, RequestID, SellerID)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Accept</button>
                        <button
                            onClick={() => RejectRequest(RequestID)}
                            style={{ backgroundColor: "#FF0000" }}
                            className="bg-blue-500 text-white px-4 ml-4 py-2 rounded-lg hover:bg-blue-600">Reject</button>
                    </div>


                </div>


            );
        }
    };


    return (
        <div>

            <div className="container mx-auto py-10 pl-16 pr-16">
                <h1 className="text-2xl font-bold mb-5">Order Requests</h1>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {products.map((product) => (
                        <ProductCard
                            // key={user[0]}
                            ProductID={product[0]}
                            VendorID={product[1]}
                            Category={product[5]}
                            Image={product[8]}
                            Name={product[2]}
                            Brand={product[4]}
                            Description={product[3]}
                            Quantity={product[6]}
                            Price={product[7]}
                            SellerID={product[9]}
                            RequestQuantity={product[10]}
                            SellerName={product[11]}
                            RequestID={product[12]}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}

export default OrderRequests;