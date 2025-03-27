import React from "react";
import Layout from "../layouts/Layout";
import Layout2 from "../layouts/Layout2";
import "../styles/MainPage.css";

const MainPage = () => {
    return (
        <Layout>
            <div className="flex">
                <Layout2 />
                <div className="main-container flex-1">
                    <h1>Добро пожаловать в приложение!</h1>
                </div>
            </div>
        </Layout>


    );
};

export default MainPage;