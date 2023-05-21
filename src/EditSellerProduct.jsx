import { useState , useEffect } from 'react';
import Header from './SellerHeader';
import Footer from './Footer';
const { Buffer } = require('buffer');

const EditSellerProduct = () => {


    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [picture, setPicture] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [rack, setRack] = useState('');


    const Pproductid = localStorage.getItem('SPproductid');
    const Psellerid = localStorage.getItem('SPsellerid');
    const Pname = localStorage.getItem('SPname');
    const Pdescription = localStorage.getItem('SPdescription');
    const Pcategory = localStorage.getItem('SPcategory');
    const Pbrand = localStorage.getItem('SPbrand');
    const Pquantity = localStorage.getItem('SPquantity');
    const Pprice = localStorage.getItem('SPprice');
    const Pimage = localStorage.getItem('SPimage');

    useEffect(() => {

        setName(Pname);
        setDescription(Pdescription);
        setPicture(Pimage);
        setBrand(Pbrand);
        setCategory(Pcategory);
        setQuantity(Pquantity);
        setPrice(Pprice);

    }, []);

    const handleSubmit = (e) => {

        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "Update products set name = '" + name + "', description = '" + description + "', brand = '" + brand + "', quantity = " + quantity + ", image = '" + picture + "', category = '" + category + "', price = " + price + " where productid = " + Pproductid + " AND sellerid = " + Psellerid
            })
        })
            .then(res => res.text()) // Get the response as a string
            .then(data => {
                console.log(data);

                if (data.includes('successful')) {
                    // The tuple was inserted successfully
                    window.location.href = "/seller-console";
                } else {
                    // The tuple was not inserted
                    console.log("Tuple was not inserted");
                }
            })
            .catch(err => console.error(err));
    };


    return (
        <div>
            <Header />

            <div className="container mx-auto my-10 p-6 bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
                <form className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Product ID
                        </label>
                        <input
                            id="id"
                            type="text"
                            placeholder="Product ID"
                            value={Pproductid}
                            className="w-full appearance-none block bg-slate-900 text-white border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            required
                            disabled
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder={Pname}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            placeholder={Pdescription}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "," || e.key === ";") {
                                    e.preventDefault();
                                }
                            }}
                            className="w-full appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label
                            htmlFor="brand"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Brand
                        </label>
                        <input
                            id="brand"
                            type="text"
                            placeholder={Pbrand}
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className="w-full appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            required
                        />
                    </div>
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
                            <option value="Electronics">Electronics</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Home">Home</option>
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
                            min={0}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="price"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Price:
                        </label>
                        <input
                            id="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            min={0}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="picture"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Picture
                        </label>
                        <input
                            id="picture"
                            type="text"
                            placeholder={Pimage}
                            value={picture}
                            onChange={(e) => setPicture(e.target.value)}
                            className="w-full appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"

                            required
                            title="Please enter a URL for the picture"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => handleSubmit()}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>

    );
}

export default EditSellerProduct;
