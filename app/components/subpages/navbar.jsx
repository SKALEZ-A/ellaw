
"use client"
import { useState } from 'react';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from "@/public/walle-logo.jpg"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="sticky backdrop-blur-lg border-b border-neutral-700/80 shadow-lg mx-16 mt-4 rounded-full w-full">
      <div className="antialiased ">
        <div className={` w-full text-gray-700 bg-gray-950 ${menuOpen ? "rounded-lg " : "rounded-full" } `}>
          <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8 rounded-full">
            <div className="flex flex-row items-center justify-between p-4">
              <a href="#" className="">
                <Image src={logo} alt='logo' className='w-12 rounded-lg sm:w-40'/>
              </a>
              {/* <<button className="rounded-lg md:hidden focus:outline-none focus:shadow-outline" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? (
                  <FaTimes className="w-6 h-6 text-gray-800" />
                ) : (
                  <FaBars className="w-6 h-6 text-gray-800" />
                )}
              </button>> */}
              <span className='text-white font-bold'>$WALLE</span>
            </div>
            <nav className={`flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row ${menuOpen ? 'flex' : 'hidden'}`}>
              {/* <a className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg hover:bg-gray-600 dark:focus:bg-gray-600 focus:text-grey-600 hover:text-gray-600 text-gray-800 md:mt-0 md:ml-4 focus:text-gray-900  focus:outline-none " href="#">How it works</a>
              <a className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg hover:bg-gray-600 dark:focus:bg-gray-600 focus:text-grey-600 hover:text-gray-600 text-gray-800 md:mt-0 md:ml-4 focus:text-gray-900  focus:outline-none " href="#">Creators</a>
              <a className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg hover:bg-gray-600 dark:focus:bg-gray-600 focus:text-grey-600 hover:text-gray-600 text-gray-800 md:mt-0 md:ml-4 focus:text-gray-900  focus:outline-none " href="#">Community</a>
              <a className="px-4 py-2 mt-2 text-sm font-semibold  hover:bg-gray-600 dark:focus:bg-gray-600 focus:text-grey-600 hover:text-gray-600 text-white md:mt-0 md:ml-4 focus:text-gray-900  focus:outline-none bg-[#562B0C] rounded-full p-3 " href="/dashboard">Get Started</a> */}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

