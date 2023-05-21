import React, { useState, useRef, useEffect } from 'react';
import { SearchIcon } from '@heroicons/react/solid';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { hasFormSubmit } from '@testing-library/user-event/dist/utils/index.js';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Shop() {

    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('Request Generated Successfully');

    const sellerId = localStorage.getItem('sellerid');



    const [sortOption, setSortOption] = useState('');

    const handleSort = (event) => {
        setSortOption(event.target.value);
    };

    const [filter, setFilter] = useState('');

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5; // replace with the actual total number of pages
    const [selectedPage, setSelectedPage] = useState(currentPage);
    const [pageChange, onPageChange] = useState('');

    const [query, setQuery] = useState('Select ProductID,Name,  Category, Brand, description, Price, Quantity, Image, VendorID from stock where list = 1');

    const [rackid, setRackid] = useState(1);

    const handlePageChange = (event) => {
        const newPage = parseInt(event.target.value);
        setSelectedPage(newPage);
        onPageChange(newPage);
        setCurrentPage(newPage);
    };


    const [users, setUsers] = useState([]);

    function updateRack(Quantity) {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "Update racks set filledCapacity = filledCapacity + " + Quantity + " where rackid = " + rackid
            })
        })
            .then(res => res.text())
            .then(data => {
                if (data == 'successful') {

                    //rack updated
                }
                else {

                }
            })
            .catch(err => console.error(err));
    }


    function checkQuantity(ProductID, VendorID, Quantity) {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "INSERT INTO trade (requestid, vendorid, productid, sellerid, quantity) SELECT RequestSeq.nextval, " + VendorID + ", " + ProductID + ", " + sellerId + ", " + Quantity + " FROM dual WHERE EXISTS (SELECT 1 FROM stock WHERE productid = " + ProductID + " AND vendorid = " + VendorID + " AND quantity >= " + Quantity + ")"
            })
        })
            .then(res => res.text())
            .then(data => {
                if (data == 'successful') {

                    updateRack(Quantity);
                    //request generated
                    if (!isOpen) {
                        setIsOpen(!isOpen);
                    }
                }
                else {

                }
            })
            .catch(err => console.error(err));
    }

    function checkAvailability(ProductID, VendorID, Quantity, Category) {
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "Select * from racks where sellerid = " + sellerId + " AND Category = '" + Category + "' AND totalcapacity - filledcapacity>=" + Quantity
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
                    setRackid(users[0][0]);
                    checkQuantity(ProductID, VendorID, Quantity);
                }
                else {

                }
            })
            .catch(err => console.error(err));
    }


    useEffect(() => {
        console.log(searchTerm);
        console.log(sortOption);
        console.log(filter);
        if (searchTerm == '') {
            if (filter == '') {
                if (sortOption == '') {
                    setQuery("Select ProductID,Name,  Category, Brand, description, Price, Quantity, Image, VendorID from stock where list = 1");
                }

                else if (sortOption == 'priceLowToHigh') {
                    setQuery('Select ProductID,Name,  Category, Brand, description, Price, Quantity, Image, VendorID from stock where list = 1 order by price asc');
                }
                else if (sortOption == 'priceHighToLow') {
                    setQuery('Select ProductID,Name,  Category, Brand, description, Price, Quantity, Image, VendorID from stock where list = 1 order by price desc');
                }
            }
            else {
                if (sortOption == '') {
                    setQuery("Select ProductID,Name,  Category, Brand, description, Price, Quantity, Image, VendorID from stock where list = 1 where Category='" + filter + "'");
                }

                else if (sortOption == 'priceLowToHigh') {
                    setQuery("Select ProductID,Name,  Category, Brand, description, Price, Quantity, Image, VendorID from stock where Category='" + filter + "' AND list = 1 order by price asc");
                }
                else if (sortOption == 'priceHighToLow') {
                    setQuery("Select ProductID,Name,  Category, Brand, description, Price, Quantity, Image, VendorID from stock where Category='" + filter + "' AND list = 1 order by price desc");
                }
            }
        } else {
            setQuery("Select ProductID,Name,  Category, Brand, description, Price, Quantity, Image, VendorID from stock where (name like('%" + searchTerm + "%') OR description like('%" + searchTerm + "%')) AND list = 1");
        }
    }, [searchTerm, filter, sortOption]);

    useEffect(() => {
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
                    const userData = data.trim().split(/[;,]/);
                    const users = [];
                    for (let i = 0; i < userData.length; i += 9) {
                        users.push(userData.slice(i, i + 9));
                    }
                    setUsers(users);
                })
                .catch(err => console.error(err));
        };

        handleFormSubmit();
    }, [query]);


    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // handle search submit here
        //window.location.href = "/error"

    };

    const truncateDescription = (description, maxLength) => {
        if (description.length <= maxLength) {
            return description;
        } else {
            // truncate at the last complete word before maxLength
            const truncated = description.slice(0, maxLength);
            return truncated.slice(0, truncated.lastIndexOf(" ")) + " ...";
        }
    };

    function ProductPage(ProductID, SellerID) {
        localStorage.setItem('productid', ProductID);
        localStorage.setItem('sellerid', SellerID);
        window.location.href = "/product-page";
    }

    const ProductCard = ({ ProductID, Name, Category, Brand, description, Price, Quantity, Image, VendorID }) => {
        const [quantity, setQuantity] = useState('');
        if (ProductID >= 1) {
            return (
                <div className="bg-gray-100 rounded-lg shadow-md">


                    {/* Product image */}
                    <div className="relative mb-[20px]">

                        <img src={Image} alt="Product 1" className="w-full h-auto mb-[20px] rounded-tr-lg rounded-tl-lg" />


                    </div>

                    <div className="p-[20px]">
                        {/* Product price */}
                        <h2
                            className="text-sm font-bold text-slate-900 inline-block opacity-80 rounded-lg py-1 mb-3"
                            style={{ border: '2px solid white' }}
                        >${(+Price).toFixed(2)} /Pc</h2>


                        <h2 className="text-lg font-bold text-slate-900 mb-[10px]">{Name}</h2>

                        <h2 className="text-md text-slate-900 mb-[10px]">{Quantity} Pcs <b>available</b></h2>

                        {/* Product description */}
                        <p className="text-gray-500 mb-[20px]">{truncateDescription(description, 75)}</p>

                        <div>
                            <label
                                htmlFor="quantity"
                                className="block text-gray-700 font-bold mb-2"
                            >

                            </label>
                            <input
                                id="quantity"
                                type="number"
                                placeholder='Quantity'
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                                min={1}
                            />
                        </div>

                        {/* Add to cart button */}
                        <button
                            onClick={() => checkAvailability(ProductID, VendorID, quantity, Category)}
                            className="text-sm bg-white text-blue-500 border-blue-500 border-2 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white">
                            Request
                        </button>



                        {/* <button
                            onClick={() => ProductPage(ProductID, SellerID)}
                            className="text-sm bg-green-500 text-white px-4 py-2 rounded-lg ml-6 hover:bg-green-600"
                        >
                            Buy
                        </button> */}
                    </div>


                </div>

            );
        }
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
    };

    const ads = [
        {
            id: 1,
            image: "https://picsum.photos/1920/1080?random=11",
            alt: "Ad 1",
        },
        {
            id: 2,
            image: "https://picsum.photos/1920/1080?random=10",
            alt: "Ad 2",
        },
        {
            id: 3,
            image: "https://picsum.photos/1920/1080?random=12",
            alt: "Ad 3",
        },
    ];

    const imageUrl = "https://img.freepik.com/free-vector/modern-black-friday-banner-horizontal-with-comic-style-background_1361-3742.jpg?w=1060&t=st=1683837322~exp=1683837922~hmac=070cd013670ad1b713ca78f437048de7af68204f5fbffcdfe3fa1cdda1a7f9ed";


    return (
        <div>

            <div className='flex flex-col min-h-screen'>
                <div className="flex flex-col md:flex-row h-auto min-h-0">

                    {/* Main content */}
                    <div className="bg-white w-full md:w-[100%] min-h-screen flex-grow">






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
                                    <option value="">All</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Clothing">Clothing</option>
                                    <option value="Beauty">Beauty</option>
                                </select>
                            </div>


                            <div className="w-full sm:w-auto mb-2 ml-5">
                                <label htmlFor="sort" className="mr-2">
                                    Sort by:
                                </label>
                                <select id="sort" className="border rounded p-1" onChange={handleSort}>
                                    <option value="">Relevance</option>
                                    <option value="priceLowToHigh">Price: Low to High</option>
                                    <option value="priceHighToLow">Price: High to Low</option>
                                </select>
                            </div>

                            <nav className="w-full sm:w-auto mb-2 ml-5">
                                {/* other navbar content */}
                                <form onSubmit={handleSearchSubmit} className="flex items-center relative">
                                    <input
                                        type="text"
                                        placeholder="Realme earbuds Pro"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="ml-2 px-3 py-1 rounded border border-gray-300 pl-8"
                                    />
                                    <SearchIcon className="pl-2 h-5 w-5 absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400" />
                                </form>
                            </nav>
                        </div>

                        <div className="p-[20px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                            {users.map((user) => (
                                <ProductCard
                                    // key={user[0]}
                                    ProductID={user[0]}
                                    Name={user[1]}
                                    Category={user[2]}
                                    Brand={user[3]}
                                    description={user[4]}
                                    Price={user[5]}
                                    Quantity={user[6]}
                                    Image={user[7]}
                                    VendorID={user[8]}
                                />
                            ))}

                        </div>

                      



                    </div>
                </div>
            </div>
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

        </div>

    );
}

export default Shop;