import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout2 from "./layouts/Layout2"; // С Sidebar
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import MainPage from "./pages/MainPage";

function App() {
    return (
        <Router>
            <Routes>
                {/* Страницы без Layout */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                {/* Страницы с Sidebar */}
                <Route path="/*" element={<Layouts2 />}>
                    <Route path="main-page" element={<MainPage />} />
                    {/* Добавь другие страницы сюда */}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;