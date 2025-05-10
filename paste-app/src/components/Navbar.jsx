import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaList } from 'react-icons/fa'; // Import icons

const Navbar = () => {
    return (
        <div className='flex justify-center space-x-6 p-4 bg-gray-800'>
            <NavLink to="/" className="flex items-center text-white hover:text-blue-500">
                <FaHome size={24} className="mr-2" />
                Home
            </NavLink>
            <NavLink to="/pastes" className="flex items-center text-white hover:text-blue-500">
                <FaList size={24} className="mr-2" />
                All Pastes
            </NavLink>
        </div>
    );
}

export default Navbar;
