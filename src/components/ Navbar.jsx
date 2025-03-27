import React from "react";
const Navbar = () => {
    return (
        <div className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
            {/* Логотип */}
            <div className="flex items-center space-x-2">
                <img src="/logo.png" alt="DMS Logo" className="w-10 h-10" />
                <span className="text-xl font-bold text-purple-700">DMS</span>
            </div>

            {/* Иконки справа */}
            <div className="flex items-center space-x-4">
                <img src="/user-icon.png" alt="User" className="w-6 h-6" />
                <div className="relative">
                    <img src="/bell-icon.png" alt="Notifications" className="w-6 h-6" />
                    <span className="absolute top-0 right-0 bg-purple-600 text-white text-xs rounded-full px-1">
            4
          </span>
                </div>
                <div className="w-8 h-8 bg-purple-800 text-white rounded-full flex items-center justify-center text-lg font-bold">
                    A
                </div>
            </div>
        </div>
    );
};

export default Navbar;