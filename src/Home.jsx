


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import Header from './SimpleHeader.jsx'
import Footer from './Footer.jsx';


const Home = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('Incorrect Credentials');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [employees, setEmployees] = useState([]);
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      fetch('http://localhost:5000/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "Select * from Buyer where email='"+email+"' and password='"+password+"'"
      })
    })
    .then(res => res.text()) // Get the response as a string
    .then(data => {
      console.log(data);
  
      if(data.includes(email)) {
        // The tuple was inserted successfully
        const dataArray = data.split(',');
        localStorage.setItem('customerid', dataArray[0]);
        localStorage.setItem('Cname', dataArray[1]);
        localStorage.setItem('Cemail', dataArray[2]);
        localStorage.setItem('Ccnic', dataArray[4]);
        localStorage.setItem('Ccontact', dataArray[5]);
        localStorage.setItem('Caddress', dataArray[6]);
        localStorage.setItem('CustomerLogin', '1');
        window.location.href = "/shop";
      } else {
        if(!isOpen)
        {
       setIsOpen(!isOpen);
        }
        // The tuple was not inserted
        console.log("Tuple was not inserted");
      }
    })
    .catch(err => console.error(err));

    };

    function onclick()
    {
    
        fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              query: "Select * from Seller where email=" + email +" AND password='" + password + "'"
            })
          }) 
            .then(res => res.json())
            .then(data => {
               setEmployees(data)
               if(data.length > 0){
                window.location.href = "/store"
               } else {
                
               }
            })
            .catch(err => console.error(err));
    }


    const handleToggle = () => {
      setIsOpen(!isOpen);
    };
  
    return (
        <div>
            <Header />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Or&nbsp;
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
            </Link>
          </p>
        </div>
  
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-gray-400"
                    />
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-4 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:placeholder-gray-400 sm:leading-5"
                    placeholder="Email address"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
  
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-4 placeholder-gray-500 focus:outline-none focus:ring-blue                   focus:border-blue-500 focus:placeholder-gray-400 sm:leading-5"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  onClick={onclick}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign in
                </button>
              </div>
  
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
  
                
              </div>
  
              <div className="mt-4">
                <p className="text-center text-sm text-gray-600">
                  Or sign in with
                </p>
  
                <div className="mt-4 flex justify-center space-x-3">
                  <button
                    type="button"
                    onClick={() => window.location.href='/seller-center'}
                    className="bg-gray-100 pl-2 pr-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    <p>Seller Center</p>
                  </button>
  
                  <button
                    type="button"
                    onClick={() => window.location.href='/vendor'}
                    className="bg-gray-100 pl-2 pr-2  text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                   <p>Vendor Account</p>
                  </button>
                </div>
              </div>
            </form>
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
      <Footer />
      </div>
    );
  }
  
  export default Home;
  
  
  