import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Layout2.css";

const SidebarForEmployee = () => {
    return (
        <div className="layout-container">
            <aside className="sidebar">
                <nav className="sidebar-nav">
                    <NavLink to="/employee/main" className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src="/lenta2.png" alt="Главная" className="nav-icon" />
                        Главная
                    </NavLink>
                    <NavLink to="/admin/profile" className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src="/personal-info.png" alt="Личная информация" className="nav-icon" />
                        Личная информация
                    </NavLink>
                    <NavLink to="/employee/requests" className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src="/news.png" alt="Заявки на ремонт" className="nav-icon" />
                        Заявки на ремонт
                    </NavLink>
                </nav>
            </aside>
            <main className="content"></main>
        </div>
    );
};

export default SidebarForEmployee;