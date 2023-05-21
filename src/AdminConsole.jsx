import React, { useState, useRef, useEffect } from 'react';
import Footer from "./Footer.jsx";
import ConsoleSideBar from './Consolesidebar.jsx';
import Product from './Products.jsx';
import AddProduct from './Addproduct.jsx';
import Header from './SimpleHeader.jsx';
import Profile from './AdminProfile.jsx'
import VendorHeader from './AdminHeader.jsx'
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import AdminRacks from './AdminRacks.jsx';
import AdminAccounts from './AdminAccounts.jsx';
import AdminCustomerReports from './AdminCustomerReports.jsx';
import AdminVendorReports from './AdminVendorReports.jsx';
import AdminSellerReports from './AdminSellerReports.jsx';
import AdminReports from './AdminReports.jsx';

const useStyles = makeStyles({
    addButton: {
        float: 'topleft',
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
    },
});

function Console() {

    const classes = useStyles();

    const [isOpen, setIsOpen] = useState(true);

    const handleDrawerButtonClick = () => {
        setIsOpen(!isOpen);

    };

    const [activeComponent, setActiveComponent] = useState("Profile");

    const handleComponentChange = (componentName) => {
        setActiveComponent(componentName);
    };

    const renderActiveComponent = () => {
        switch (activeComponent) {
            case "AddProduct":
                return (<div>
                    <Product />
                    <Button
                        onClick={() => handleComponentChange("Add")}
                        className={classes.addButton} variant="contained" color="primary">+ Add Product</Button>
                </div>);
            case "Header":
                return <Header />;
            case "Profile":
                return <Profile />;
            case "Add":
                return <AddProduct />;
            case "Racks":
                return <AdminRacks />;
            case "Accounts":
                return <AdminAccounts />;   
            case "Reports":
                return <AdminReports />;
            case "CReports":
                return <AdminCustomerReports />;
            case "SReports":
                return <AdminSellerReports />;
            case "VReports":
                return <AdminVendorReports />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <VendorHeader />
            <div className="flex flex-1">
                <aside className="bg-gray-200 w-64 hidden sm:block">
                    <nav className="mt-6">
                        <button className="w-64" onClick={() => handleComponentChange("Profile")}>
                            <a

                                className="flex items-center py-2 px-4 text-gray-600 hover:bg-blue-100 hover:text-blue-500"
                            >
                                <svg
                                    className="w-5 h-5 mr-2"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 2.25C7.029 2.25 2.25 7.029 2.25 12C2.25 16.971 7.029 21.75 12 21.75C16.971 21.75 21.75 16.971 21.75 12C21.75 7.029 16.971 2.25 12 2.25ZM12 5.25C13.9326 5.25 15.5235 6.55124 16.2338 8.25H7.76618C8.47648 6.55124 10.0674 5.25 12 5.25ZM5.25 12C5.25 9.31617 7.31617 7.25 10 7.25C12.6838 7.25 14.75 9.31617 14.75 12C14.75 14.6838 12.6838 16.75 10 16.75C7.31617 16.75 5.25 14.6838 5.25 12ZM18.3742 14.8722C17.404 13.8396 16.1695 13.25 14.75 13.25H9.25C7.83052 13.25 6.59604 13.8396 5.62579 14.8722C6.81472 15.9903 8.42249 16.75 10 16.75C11.5775 16.75 13.1853 15.9903 14.3742 14.8722L14.375 14.8722L14.3742 14.8722L14.375 14.8722L18.3742 14.8722Z"
                                        fill="currentColor"
                                    />
                                </svg>

                                Profile
                            </a>
                        </button>
                        <button className="w-64" onClick={() => handleComponentChange("Accounts")}>
                            <a

                                className="flex items-center py-2 px-4 text-gray-600 hover:bg-blue-100 hover:text-blue-500"
                            >
                                <svg
                                    className="w-5 h-5 mr-2"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M21 12l-18 12v-24l18 12zM3 19.697l12-7.999 3.874 2.583-3.874 2.583zM15 12.584l3.874-2.584v5.168l-3.874-2.584zM9 7.415l-3.874 2.584v-5.168l3.874 2.584z"
                                        fill="currentColor"
                                    />
                                </svg>
                                Manage Accounts
                            </a>
                        </button>
                        <button className="w-64" onClick={() => handleComponentChange("Racks")}>
                            <a
                            
                                className="flex items-center py-2 px-4 text-gray-600 hover:bg-blue-100 hover:text-blue-500"
                            >

                                ⊡ Category & Racks
                            </a>
                        </button>
                        <button className="w-64" onClick={() => handleComponentChange("Reports")}>
                        <a
                         
                            className="flex items-center py-2 px-4 text-gray-600 hover:bg-blue-100 hover:text-blue-500"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M21 10.5V6.75C21 5.78409 20.2159 5 19.25 5H16.5C15.5341 5 14.75 5.78409 14.75 6.75V10.5C14.75 11.4659 15.5341 12.25 16.5 12.25H19.25C20.2159 12.25 21 11.4659 21 10.5Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M19.25 14H16.5C15.5341 14 14.75 14.7841 14.75 15.75V19.5C14.75 20.4659 15.5341 21.25 16.5 21.25H19.25C20.2159 21.25 21 20.4659 21 19.5V15.75C21 14.7841 20.2159 14 19.25 14Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M8.5 5H5.75C4.78409 5 4 5.78409 4 6.75V10.5C4 11.4659 4.78409 12.25 5.75 12.25H8.5C9.46591 12.25 10.25 11.4659 10.25 10.5V6.75C10.25 5.78409 9.46591 5 8.5 5Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M5.75 14C4.78409 14 4 14.7841 4 15.75V19.5C4 20.4659 4.78409 21.25 5.75 21.25H8.5C9.46591 21.25 10.25 20.4659 10.25 19.5V15.75C10.25 14.7841 9.46591 14 8.5 14H5.75Z"
                                    fill="currentColor"
                                />
                            </svg>
                            Customized Reports
                        </a>
                        </button>
                        <button className="w-64" onClick={() => handleComponentChange("CReports")}>
                        <a
                         
                            className="flex items-center py-2 px-4 text-gray-600 hover:bg-blue-100 hover:text-blue-500"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M21 10.5V6.75C21 5.78409 20.2159 5 19.25 5H16.5C15.5341 5 14.75 5.78409 14.75 6.75V10.5C14.75 11.4659 15.5341 12.25 16.5 12.25H19.25C20.2159 12.25 21 11.4659 21 10.5Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M19.25 14H16.5C15.5341 14 14.75 14.7841 14.75 15.75V19.5C14.75 20.4659 15.5341 21.25 16.5 21.25H19.25C20.2159 21.25 21 20.4659 21 19.5V15.75C21 14.7841 20.2159 14 19.25 14Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M8.5 5H5.75C4.78409 5 4 5.78409 4 6.75V10.5C4 11.4659 4.78409 12.25 5.75 12.25H8.5C9.46591 12.25 10.25 11.4659 10.25 10.5V6.75C10.25 5.78409 9.46591 5 8.5 5Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M5.75 14C4.78409 14 4 14.7841 4 15.75V19.5C4 20.4659 4.78409 21.25 5.75 21.25H8.5C9.46591 21.25 10.25 20.4659 10.25 19.5V15.75C10.25 14.7841 9.46591 14 8.5 14H5.75Z"
                                    fill="currentColor"
                                />
                            </svg>
                            Customer Reports
                        </a>
                        </button>
                        <button className="w-64" onClick={() => handleComponentChange("SReports")}>
                        <a
                         
                            className="flex items-center py-2 px-4 text-gray-600 hover:bg-blue-100 hover:text-blue-500"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M21 10.5V6.75C21 5.78409 20.2159 5 19.25 5H16.5C15.5341 5 14.75 5.78409 14.75 6.75V10.5C14.75 11.4659 15.5341 12.25 16.5 12.25H19.25C20.2159 12.25 21 11.4659 21 10.5Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M19.25 14H16.5C15.5341 14 14.75 14.7841 14.75 15.75V19.5C14.75 20.4659 15.5341 21.25 16.5 21.25H19.25C20.2159 21.25 21 20.4659 21 19.5V15.75C21 14.7841 20.2159 14 19.25 14Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M8.5 5H5.75C4.78409 5 4 5.78409 4 6.75V10.5C4 11.4659 4.78409 12.25 5.75 12.25H8.5C9.46591 12.25 10.25 11.4659 10.25 10.5V6.75C10.25 5.78409 9.46591 5 8.5 5Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M5.75 14C4.78409 14 4 14.7841 4 15.75V19.5C4 20.4659 4.78409 21.25 5.75 21.25H8.5C9.46591 21.25 10.25 20.4659 10.25 19.5V15.75C10.25 14.7841 9.46591 14 8.5 14H5.75Z"
                                    fill="currentColor"
                                />
                            </svg>
                            Seller Reports
                        </a>
                        </button>
                        <button className="w-64" onClick={() => handleComponentChange("VReports")}>
                        <a
                         
                            className="flex items-center py-2 px-4 text-gray-600 hover:bg-blue-100 hover:text-blue-500"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M21 10.5V6.75C21 5.78409 20.2159 5 19.25 5H16.5C15.5341 5 14.75 5.78409 14.75 6.75V10.5C14.75 11.4659 15.5341 12.25 16.5 12.25H19.25C20.2159 12.25 21 11.4659 21 10.5Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M19.25 14H16.5C15.5341 14 14.75 14.7841 14.75 15.75V19.5C14.75 20.4659 15.5341 21.25 16.5 21.25H19.25C20.2159 21.25 21 20.4659 21 19.5V15.75C21 14.7841 20.2159 14 19.25 14Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M8.5 5H5.75C4.78409 5 4 5.78409 4 6.75V10.5C4 11.4659 4.78409 12.25 5.75 12.25H8.5C9.46591 12.25 10.25 11.4659 10.25 10.5V6.75C10.25 5.78409 9.46591 5 8.5 5Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M5.75 14C4.78409 14 4 14.7841 4 15.75V19.5C4 20.4659 4.78409 21.25 5.75 21.25H8.5C9.46591 21.25 10.25 20.4659 10.25 19.5V15.75C10.25 14.7841 9.46591 14 8.5 14H5.75Z"
                                    fill="currentColor"
                                />
                            </svg>
                            Vendor Reports
                        </a>
                        </button>
                    </nav>
                </aside>
                <main className="flex-1 bg-gray-100">

                    {renderActiveComponent()}



                    {/* <div className="px-6 py-4">
                        <h2 className="text-xl font-semibold mb-2 pl-1">Browser Status: Verified ✅</h2>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <p className="text-gray-600">
                               {email}
                            </p>
                        </div>
                    </div> */}





                </main>
            </div>

            <Footer />

        </div>
    );
}

export default Console;