import React from "react";

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col w-full">
            {/* Верхняя панель */}
            <header className="w-full bg-white shadow-md p-4 flex justify-between items-center">
                <h1 className="text-lg font-bold">Главная</h1>
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">🔔 4</span>
                    <span className="w-8 h-8 bg-purple-600 text-white flex items-center justify-center rounded-full font-bold">
            A
          </span>
                </div>
            </header>

            {/* Контентная часть (основная) */}
            <main className="flex flex-1">{children}</main>
        </div>
    );
};

export default Layout;

