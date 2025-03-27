import Navbar from "../components/ Navbar.jsx";

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col h-screen">
            {/* Верхняя панель*/}
            <Navbar />

            {/* Контент страницы */}
            <div className="flex flex-1">
                {children}
            </div>
        </div>
    );
};

export default Layout;