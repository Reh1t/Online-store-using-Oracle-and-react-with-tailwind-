


import { useState } from 'react';
import Header from './SimpleHeader';
import Footer from './Footer';
const { Buffer } = require('buffer');

const AddProduct = () => {

    const vendorId = localStorage.getItem('vendorid');

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [quantity, setQuantity] = useState('');
    const [picture, setPicture] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [rack, setRack] = useState('');

    // const handlePictureChange = (event) => {
    //     const file = event.target.files[0];
    //     setPicture(file);
    // };

    // const handleSubmit = () => {
    //     // const formData = new FormData();
    //     // formData.append('name', name);
    //     // formData.append('description', description);
    //     // formData.append('brand', brand);
    //     // formData.append('quantity', quantity);
    //     // formData.append('picture', picture);
    //     // formData.append('price', price);
    //     // formData.append('category', category);
    //     // formData.append('rack', rack);

    //     // fetch('http://localhost:5000/add-product', {
    //     //     method: 'POST',
    //     //     body: formData,
    //     // })
    //     //     .then((res) => res.json())
    //     //     .then((data) => {
    //     //         console.log(data);
    //     //     })
    //     //     .catch((err) => console.error(err));
    // };

    const handleSubmit = (e) => {

        fetch('http://localhost:5000/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: "INSERT INTO Stock (ProductID, VendorID, Name, Description, Brand, Category, Quantity, Price, Image) VALUES (ProductSeq.nextval, "+vendorId+", '"+name+"', '"+description+"', '"+brand+"', '"+category+"', "+quantity+", "+price+", '"+picture+"')"
          })
        })
        .then(res => res.text()) // Get the response as a string
        .then(data => {
          console.log(data);
      
          if(data.includes('successful')) {
            // The tuple was inserted successfully
            //window.location.href = "/";
          } else {
            // The tuple was not inserted
            console.log("Tuple was not inserted");
          }
        })
        .catch(err => console.error(err));
      };


    return (
     
            <div className="container mx-auto my-10 p-6 bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Add Product</h1>
                <form className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                            placeholder="Product Name"
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
                            placeholder="Product Description"
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
                            placeholder="Product Brand"
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
                            placeholder="URL"
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
                            type="submit"
                            onClick={()=>handleSubmit()}
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
    
    );
}

export default AddProduct;
