import React from 'react';

const ProfilePage = () => {
    const vendorId = localStorage.getItem('vendorid');
    const name = localStorage.getItem('Vname');
    const email = localStorage.getItem('Vemail');
    const cnic = localStorage.getItem('Vcnic');
    const contact = localStorage.getItem('Vcontact');
    const address = localStorage.getItem('Vaddress');

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="py-10">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                {/* <h1 className="text-3xl font-bold text-gray-900 p-5 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500"><span>{name}</span> <b className="text-sm">✓</b></h1> */}
                <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent p-5 rounded-lg">{name} <b className="text-sm">✓</b></h1>
                    <button
                    onClick={() =>window.location.href = "/edit-vendor"}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Edit Profile
                    </button>
                </div>
                  
                    <div className="mt-6 flex flex-col space-y-4">
                        <div className="flex flex-col sm:flex-row sm:space-x-4">
                            <div className="w-full sm:w-1/2">
                                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">CNIC</h3>
                                        <div className="mt-2 max-w-xl text-sm text-gray-500">{cnic}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/2">
                                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Email</h3>
                                        <div className="mt-2 max-w-xl text-sm text-gray-500">{email}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:space-x-4">
                            <div className="w-full sm:w-1/2">
                                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Contact</h3>
                                        <div className="mt-2 max-w-xl text-sm text-gray-500">{contact}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/2">
                                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Address</h3>
                                        <div className="mt-2 max-w-xl text-sm text-gray-500">{address}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Vendor ID</h3>
                                    <div className="mt-2 max-w-xl text-sm text-gray-500">{vendorId}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;