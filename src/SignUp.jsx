import React, { useState } from "react";
import Header from "./SimpleHeader";
import Footer from "./Footer";

const SignUp = () => {
  const [name, setName] = useState("");
  const [cnic, setCNIC] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");

  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState('');
  const [show, setshow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "INSERT INTO "+ accountType + " ("+accountType+"ID, Name, Email, Password, CNIC, Contact, Address) VALUES ("+accountType+"Seq.nextval, '"+name+"', '"+email+"', '"+password+"' , '"+cnic+"', '"+contact+"', '"+address+"')"
      })
    })
    .then(res => res.text()) // Get the response as a string
    .then(data => {
      console.log(data);
  
      if(data.includes('successful')) {
        // The tuple was inserted successfully
        window.location.href = "/";
      } else {
        // The tuple was not inserted
        console.log("Tuple was not inserted");
      }
    })
    .catch(err => console.error(err));
  };
  
  


  return (
    <div><Header />
   

    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Sign Up</h1>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="name">
              CNIC
            </label>
            <input
              className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="cnic"
              value={cnic}
              onChange={(e) => setCNIC(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="contact">
              Contact
            </label>
            <input
              className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="contact"
              type="tel"
              name="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="address">
              Address
            </label>
            <input
              className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
        
          <label className="block font-bold mb-2" htmlFor="accountType">
            Account Type
          </label>
          <div className="relative">
            <select
              name="accountType"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              required
              className="appearance-none rounded-full w-32 py-2 px-4 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Account Type</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="vendor">Vendor</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 16a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 13.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 16z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label className="block font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="********"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
          {/* <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            to="/signin"
          >
            Already have an account? Sign in
          </Link> */}
        </div>
      </form>
      </div>
  </div>
    </div>
  </div>
  <Footer />
  </div>
);
};

export default SignUp;