import { useState } from 'react';

function ConsoleSideBar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const [isOpen2, setIsOpen2] = useState(false);

    const openConsole = (event) => {
        event.preventDefault();
        window.location.href = "/console";
      };

    return (
        <div className="relative">
            <button className="flex items-center px-7 py-2 text-white border-teal-400  sm:hidden" onClick={handleToggle}>
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-6z" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                     <nav className="mt-6 mb-6">
            {/* <a
              href="#"
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
              Overview
            </a>
            <a
              href="#"
              className="flex items-center py-2 px-4 text-gray-600 hover:bg-blue-100 hover:text-blue-500"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 5h5v5H5V5zM5 14h5v5H5v-5zM14 14h5v5h-5v-5zM14 5h5v5h-5V5z"
                  fill="currentColor"
                />
                <path
                  d="M7 7h2v2H7V7zM7 16h2v2H7v-2zM16 16h2v2h-2v-2zM16 7h2v2h-2V7z"
                  fill="#fff"
                />
              </svg>
              Releases
            </a>
            <a
              href="#"
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
             Files
           </a> */}
         </nav>
                </div>
            )}
        </div>
    );
}

export default ConsoleSideBar;