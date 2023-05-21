import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

function TradeRequests() {

    const sellerid = localStorage.getItem('sellerid');

    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: "SELECT s.*, t.vendorid,t.quantity,v.name,t.requestid,r.rackid FROM trade t JOIN stock s ON s.productid = t.productid AND s.vendorid = t.vendorid join vendor v on v.vendorid = t.vendorid join racks r on r.CATEGORY=s.CATEGORY WHERE  t.sellerid=r.sellerid and r.sellerid ="+sellerid
                })
            });
            const data = await response.text();
            const userData = data.trim().split(/[;,]/);
            const products = [];
            for (let i = 0; i < userData.length; i += 14) {
                products.push(userData.slice(i, i + 14));
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

    function updateRack (RackID, RequestQuantity)
    {
        fetch('http://localhost:5000/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: "Update racks set filledCapacity = filledCapacity - "+RequestQuantity+" where rackid = "+RackID
                })
            })
                .then(res => res.text())
                .then(data => {
                    if(data == 'successful')
                    {
                        
                        fetchProducts();
                         //rack updated
                    }
                    else{

                    }
                })
                .catch(err => console.error(err));
    }

    function CancelRequest(RequestID, RackID, RequestQuantity) {
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

                  updateRack(RackID, RequestQuantity);
                }
            })
            .catch(err => console.error(err));
    }

    const ProductCard = ({ ProductID, VendorID, Category, Image, Name, Brand, Description, Quantity, Price, SellerID, RequestQuantity, SellerName, RequestID, RackID }) => {
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
                        <p className="text-gray-500"><b>To:</b> {SellerName}</p>
                        <p className="text-gray-500 mb-[20px]"><b>Pcs:</b> {RequestQuantity}</p>

                        {/* Add to cart button */}
                    
                        <button
                            onClick={() => CancelRequest(RequestID, RackID, RequestQuantity)}
                            className="text-sm bg-white text-red-500 border-red-500 border-2 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white">Cancel Request</button>
                    </div>


                </div>


            );
        }
    };


    return (
        <div>

            <div className="container mx-auto py-10 pl-16 pr-16">
                <h1 className="text-2xl font-bold mb-5">My Requests</h1>
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
                            RackID={product[13]}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}

export default TradeRequests;