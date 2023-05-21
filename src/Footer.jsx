import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-yellow-500 text-gray-300 py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-lg text-slate-900 font-bold mb-2">About Us</h3>
            <p className="text-sm text-slate-900">ALI RUBASS  |  REHAN TARIQ  |  BURHAN HUSSAIN</p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-2 text-slate-900">Database-Lab Semester Project</h3>
          </div>
          <div className="text-center md:text-right">
            <h3 className="text-lg font-bold mb-2 text-slate-900">Follow Us</h3>
            <div className="flex justify-center md:justify-end">
              <a href="" className="mx-2"><FaFacebook className="text-gray-300 hover:text-white" /></a>
              <a href="" className="mx-2"><FaTwitter className="text-gray-300 hover:text-white" /></a>
              <a href="" className="mx-2"><FaInstagram className="text-gray-300 hover:text-white" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;