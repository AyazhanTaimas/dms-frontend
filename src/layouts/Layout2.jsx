import React from "react";
import { NavLink } from "react-router-dom";

const Layout2 = ({ children }) => {
    return (
        <div className="flex h-screen">
            {/* Левая боковая панель */}
            <aside className="w-64 bg-gray-100 p-4 flex flex-col">
                {/* Логотип */}
                <div className="flex items-center space-x-2 mb-6">
                    <div className="w-12 h-12 bg-purple-600 flex items-center justify-center rounded-full">
                        <span className="text-white text-2xl font-bold">🏠</span>
                    </div>
                    <h2 className="text-lg font-bold text-purple-700">DMS</h2>
                </div>

                {/* Навигация */}
                <nav className="flex flex-col space-y-2">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg ${
                                isActive ? "bg-purple-200 text-purple-800 font-bold" : "text-gray-700"
                            }`
                        }
                    >
                        <span className="mr-2">🏠</span> Лента
                    </NavLink>
                    <NavLink
                        to="/market"
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg ${
                                isActive ? "bg-purple-200 text-purple-800 font-bold" : "text-gray-700"
                            }`
                        }
                    >
                        <span className="mr-2">🛒</span> Купи-Продай
                    </NavLink>
                </nav>
            </aside>

            {/* Основное содержимое */}
            <div className="flex-1 p-4">{children}</div>
        </div>
    );
};

export default Layout2;


