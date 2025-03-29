import React, { useState } from "react";
import "../styles/PersonalInfo.css"; // Подключаем CSS-файл

const PersonalInfo = () => {
    const [userInfo, setUserInfo] = useState({
        fullName: "Токанова Аяжан",
        status: "Проживающий",
        address: "Корпус 1, этаж 2, комната 14Б",
        id: "21B030931",
        email: "a_tokanova@kbtu.kz",
        phone: "87071711204",
    });

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <h1 className="title">Личные данные</h1>

            <div className="profile">
                <img src="/avatar.png" alt="User Avatar" className="avatar" />
                <div className="info">
                    <h2 className="name">{userInfo.fullName}</h2>
                    <p className="status">{userInfo.status}</p>
                    <p className="address">{userInfo.address}</p>
                </div>
            </div>

            <div className="form">
                <div className="form-group">
                    <label>ID</label>
                    <input type="text" value={userInfo.id} disabled className="input disabled" />
                </div>
                <div className="form-group">
                    <label>Номер телефона</label>
                    <input type="text" name="phone" value={userInfo.phone} onChange={handleChange} className="input" />
                </div>
                <div className="form-group">
                    <label>E-Mail</label>
                    <input type="email" name="email" value={userInfo.email} onChange={handleChange} className="input" />
                </div>
                <div className="form-group">
                    <label>Пароль</label>
                    <button className="button black">Изменить</button>
                </div>
            </div>

            <div className="button-container">
                <button className="button save">Сохранить изменения</button>
            </div>

        </div>
    );
};

export default PersonalInfo;


