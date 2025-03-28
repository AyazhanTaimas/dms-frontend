import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Layout2.css";

const Layout2 = ({ children }) => {
    return (
        <div className="layout-container">
            <aside className="sidebar">


                <nav className="sidebar-nav">
                    <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src="/lenta2.png" alt="Lenta" className="lenta" />
                        Лента
                    </NavLink>

                    <NavLink to="/market" className={({isActive}) => (isActive ? "active" : "")}>
                        <img src="/shop.png" alt="Shop" className="shop"/>
                        Купи-Продай
                    </NavLink>
                </nav>
            </aside>

            {/* Основное содержимое */}
            <main className="content">
                {children} {/* Вставляем переданное содержимое */}
            </main>
        </div>
    );
};

export default Layout2;
