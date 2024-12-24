import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 p-4 flex items-center justify-between">
            <div className="flex items-center">
                <img src="/path/to/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
                <span className="text-white text-xl font-bold">Brand</span>
            </div>
            <div className="flex-1 mx-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex items-center space-x-4">
                <img src="/path/to/icon1.png" alt="Icon 1" className="h-6 w-6" />
                <img src="/path/to/icon2.png" alt="Icon 2" className="h-6 w-6" />
                <img src="/path/to/icon3.png" alt="Icon 3" className="h-6 w-6" />
                <img src="/path/to/icon4.png" alt="Icon 4" className="h-6 w-6" />
                <img src="/path/to/icon5.png" alt="Icon 5" className="h-6 w-6" />
            </div>
        </nav>
    );
};

export default Navbar;