import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Profile() {
    const CustomerId = localStorage.getItem('customerid');
    const name = localStorage.getItem('Cname');
    const email = localStorage.getItem('Cemail');
    const cnic = localStorage.getItem('Ccnic');
    const contact = localStorage.getItem('Ccontact');
    const address = localStorage.getItem('Caddress');
    return (
        <div>
            <Header />
            <div className="max-w-md mx-auto px-4 py-8 bg-white rounded-lg shadow-lg m-16">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">Profile</h1>
                    <button
                    onClick={() =>window.location.href = "/edit-customer"}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Edit
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-700 font-bold mb-2" htmlFor="customerid">
                            Customer ID
                        </label>
                        <div className="border border-gray-300 rounded-lg px-4 py-2">
                            {CustomerId}
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-700 font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <div className="border border-gray-300 rounded-lg px-4 py-2">
                            {name}
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-700 font-bold mb-2" htmlFor="cnic">
                            CNIC
                        </label>
                        <div className="border border-gray-300 rounded-lg px-4 py-2">
                            {cnic}
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-700 font-bold mb-2" htmlFor="address">
                            Address
                        </label>
                        <div className="border border-gray-300 rounded-lg px-4 py-2">
                            {address}
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-700 font-bold mb-2" htmlFor="contact">
                            Contact
                        </label>
                        <div className="border border-gray-300 rounded-lg px-4 py-2">
                            {contact}
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-700 font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <div className="border border-gray-300 rounded-lg px-4 py-2">
                            {email}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;
