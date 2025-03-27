import { NavLink } from "react-router-dom";

const Layout2 = () => {
    return (
        <div className="w-64 h-screen bg-gray-100 p-4 flex flex-col">
            <NavLink
                to="/feed"
                className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition ${isActive ? 'bg-purple-200 text-purple-800' : 'text-gray-700 hover:bg-gray-200'}`
                }
            >
                <span className="mr-2">🏠</span> Лента
            </NavLink>
            <NavLink
                to="/market"
                className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition ${isActive ? 'bg-purple-200 text-purple-800' : 'text-gray-700 hover:bg-gray-200'}`
                }
            >
                <span className="mr-2">🛍️</span> Купи-Продай
            </NavLink>
        </div>
    );
};

export default Layout2;