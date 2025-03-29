import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout2 from "./layouts/Layout2"; // Левый Sidebar
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import MainPage from "./pages/MainPage";
import Layout from "./layouts/Layout"; // Верхняя панель
import HousingPage from "./pages/HousingPage";


function App() {
    return (
        <Router>
            <Routes>
                {/* Страницы без Layout */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                {/* Страницы с Sidebar и верхней панелью */}
                <Route path="/*" element={
                    <Layout>
                        <Layout2 />
                        <Routes>
                            <Route path="main-page" element={<MainPage />} />
                            <Route path="housing" element={<HousingPage />} />
                        </Routes>
                    </Layout>
                } />
            </Routes>
        </Router>
    );
}

export default App;
