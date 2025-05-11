import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext.jsx'; // Импортируем UserContext
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import Layout from './layouts/Layout';
import Layout2 from './layouts/Layout2';
import SidebarForManager from './layouts/SidebarForManager';
import SidebarForEmployee from './layouts/SidebarForEmployee';
import SidebarForAdmin from './layouts/SidebarForAdmin';
import ForgotPasswordPage from './pages/student/ForgotPasswordPage';
import HousingPage from './pages/student/HousingPage';
import PersonalInfo from './pages/PersonalInfo';
import DocumentsPage from './pages/student/DocumentsPage';
import FinancialCabinet from './pages/student/FinancialCabinet';
import RepairRequest from './pages/student/RepairRequest';
import PERegistration from './pages/student/PERegistration';

import UsersPage from './pages/manager/UsersPage';
import UserInformation from './components/UsersInformation';
import Accommodation from './pages/manager/Accommodation';
import News from './pages/News';
import ChangeOfRoom from './pages/manager/ChangeOfRoom';

import Main from './pages/employee/Main';
import RepairRequests from './pages/employee/RepairRequests';
import BuySellPage from "./pages/student/BuySellPage.jsx";

function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/*" element={<LayoutWithSidebar />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

const LayoutWithSidebar = () => {
    const { role } = useUser(); // Используем контекст для получения роли

    return (
        <Layout>
            {/* В зависимости от роли отображаем соответствующую боковую панель */}
            {role === "student" && <Layout2 />}
            {role === "manager" && <SidebarForManager />}
            {role === "admin" && <SidebarForAdmin />}
            {role === "employee" && <SidebarForEmployee />}


            <Routes>
                <Route path="main-page" element={<MainPage />} />
                {role === "student" && (
                    <>
                        <Route path="housing" element={<HousingPage />} />
                        <Route path="personal-info" element={<PersonalInfo />} />
                        <Route path="documents" element={<DocumentsPage />} />
                        <Route path="financial-cabinet" element={<FinancialCabinet />} />
                        <Route path="repair-requests" element={<RepairRequest />} />
                        <Route path="pe-registration" element={<PERegistration />} />
                        <Route path="buy-sell" element={<BuySellPage />} />
                    </>
                )}
                {role === "manager" && (
                    <>
                        <Route path="/manager/accommodation" element={<Accommodation />} />
                        <Route path="/manager/users" element={<UsersPage />} />
                        <Route path="personal-info" element={<PersonalInfo />} />
                        <Route path="/manager/users/:id" element={<UserInformation />} />
                        <Route path="/manager/news" element={<News />} />
                        <Route path="/manager/room-change-requests" element={<ChangeOfRoom />} />
                    </>
                )}
                {role === "admin" && (
                    <>
                        <Route path="/admin/users" element={<UsersPage />} />
                        <Route path="/admin/users/:id" element={<UserInformation />} />
                        <Route path="/admin/news" element={<News />} />
                    </>
                )}
                {role === "employee" && (
                    <>
                        <Route path="/employee/main" element={<Main />} />
                        <Route path="personal-info" element={<PersonalInfo />} />
                        <Route path="/employee/requests" element={<RepairRequests />} />
                    </>
                )}
            </Routes>
        </Layout>
    );
}

export default App;



