import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Layout2.css";

const Layout2 = ({ isSettled }) => {
    return (
        <div className="layout-container">
            <aside className="sidebar">
                <nav className="sidebar-nav">
                    <NavLink to="/main-page" className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src="/lenta2.png" alt="Lenta" className="nav-icon" />
                        Лента
                    </NavLink>
                    <NavLink to="/housing" className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src="/housing.png" alt="Housing" className="nav-icon" />
                        Проживание
                    </NavLink>
                    <NavLink to="/market" className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src="/shop.png" alt="Shop" className="nav-icon" />
                        Купи-Продай
                    </NavLink>

                    {isSettled && (
                        <>
                            <NavLink to="/personal-info" className={({ isActive }) => (isActive ? "active" : "")}>
                                <img src="/personal-info.png" alt="Personal Info" className="nav-icon" />
                                Личная информация
                            </NavLink>
                            <NavLink to="/documents" className={({ isActive }) => (isActive ? "active" : "")}>
                                <img src="/doc.png" alt="Documents" className="nav-icon" />
                                Документы
                            </NavLink>
                            <NavLink to="/financial-cabinet" className={({ isActive }) => (isActive ? "active" : "")}>
                                <img src="/finance.png" alt="Finance" className="nav-icon" />
                                Финансовый кабинет
                            </NavLink>
                            <NavLink to="/repair-requests" className={({ isActive }) => (isActive ? "active" : "")}>
                                <img src="/repair.png" alt="Repair Requests" className="nav-icon" />
                                Запросы на ремонт
                            </NavLink>
                            <NavLink to="/pe-registration" className={({ isActive }) => (isActive ? "active" : "")}>
                                <img src="/sports.png" alt="Sports Signup" className="nav-icon" />
                                Запись на занятия физкультурой
                            </NavLink>
                        </>
                    )}
                </nav>
            </aside>
            <main className="content"></main>
        </div>
    );
};

export default Layout2;

