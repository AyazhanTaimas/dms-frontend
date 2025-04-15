import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout2 from "./layouts/Layout2"; // Левый Sidebar
import LoginPage from "./pages/LoginPage.jsx";
import ForgotPasswordPage from "./pages/student/ForgotPasswordPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import Layout from "./layouts/Layout"; // Верхняя панель
import HousingPage from "./pages/student/HousingPage.jsx";
import PersonalInfo from "./pages/student/PersonalInfo.jsx";
import DocumentsPage from "./pages/student/DocumentsPage.jsx";
import FinancialCabinet from "./pages/student/FinancialCabinet.jsx";
import RepairRequest from "./pages/student/RepairRequest.jsx";
import PERegistration from "./pages/student/PERegistration.jsx";

import SidebarForAdmin from "./layouts/SidebarForAdmin.jsx";
import UsersPage from "./pages/admin/UsersPage.jsx";

function App() {
     const [isSettled, setIsSettled] = useState(false);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                {/* Student Layout*/}
                 <Route path="/*" element={
                    <Layout>
                        <Layout2 isSettled={isSettled} />
                        <Routes>
                            <Route path="main-page" element={<MainPage />} />
                            <Route path="housing" element={<HousingPage setIsSettled={setIsSettled} />} />
                            <Route path="personal-info" element={<PersonalInfo />} />
                            <Route path="documents" element={<DocumentsPage />} />
                            <Route path="financial-cabinet" element={<FinancialCabinet />} />
                            <Route path="repair-requests" element={<RepairRequest />} />
                            <Route path="pe-registration" element={<PERegistration />} />
                        </Routes>
                    </Layout>
                } />




                {/* Admin Layout
                <Route path="/*" element={
                    <Layout>
                        <SidebarForAdmin />
                        <Routes>
                            <Route path="main-page" element={<MainPage />} />
                            <Route path="users" element={<UsersPage />} />
                        </Routes>
                    </Layout>
                } />*/}
            </Routes>
        </Router>
    );
}

export default App;

