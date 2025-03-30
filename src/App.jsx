import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout2 from "./layouts/Layout2"; // Левый Sidebar
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import MainPage from "./pages/MainPage";
import Layout from "./layouts/Layout"; // Верхняя панель
import HousingPage from "./pages/HousingPage";
import PersonalInfo from "./pages/PersonalInfo";

function App() {
    const [isSettled, setIsSettled] = useState(false);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                {/* Всё внутри Layout */}
                <Route path="/*" element={
                    <Layout>
                        <Layout2 isSettled={isSettled} />
                        <Routes>
                            <Route path="main-page" element={<MainPage />} />
                            <Route path="housing" element={<HousingPage onSettle={() => setIsSettled(true)} />} />
                            <Route path="personal-info" element={<PersonalInfo />} />
                        </Routes>
                    </Layout>
                } />
            </Routes>
        </Router>
    );
}

export default App;

