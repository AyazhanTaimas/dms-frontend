import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Layout2.css"; // Подключи нужный CSS, если у тебя отдельный для админа

const SidebarForAdmin = () => {
    return (
        <div className="layout-container">
            <aside className="sidebar">
                <nav className="sidebar-nav">
                    <NavLink to="/main" className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src="/lenta2.png" alt="Главная" className="nav-icon" />
                        Главная
                    </NavLink>
                    <NavLink to="/admin/users" className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src="/users.png" alt="Пользователи" className="nav-icon" />
                        Пользователи
                    </NavLink>
                    <NavLink to="/admin/news" className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src="/news.png" alt="Новости" className="nav-icon" />
                        Новости
                    </NavLink>
                </nav>
            </aside>
            <main className="content"></main>
        </div>
    );
};

export default SidebarForAdmin;