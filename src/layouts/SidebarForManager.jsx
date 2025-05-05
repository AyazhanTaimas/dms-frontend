import { NavLink } from "react-router-dom";
import "../styles/Layout2.css";

const SidebarForManager = () => {
    return (
        <div className="layout-container">
            <aside className="sidebar">
                <nav className="sidebar-nav">
                    <NavLink to="/main-page" className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src="/lenta2.png" alt="Главная" className="nav-icon" />
                        Главная
                    </NavLink>
                    <NavLink to="/manager/news" className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src="/news.png" alt="Новости" className="nav-icon" />
                        Новости
                    </NavLink>
                    <NavLink to="/manager/users" className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src="/users.png" alt="Пользователи" className="nav-icon" />
                        Пользователи
                    </NavLink>
                    <NavLink to="/manager/accommodation" className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src="/accommodation.png" alt="Заявки на проживание" className="nav-icon" />
                        Заявки на проживание
                    </NavLink>
                    <NavLink to="/manager/room-change-requests" className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src="/accommodation.png" alt="Заявки на смену комнаты" className="nav-icon" />
                        Заявки на смену комнаты
                    </NavLink>
                </nav>
            </aside>
            <main className="content"></main>
        </div>
    );
};

export default SidebarForManager;