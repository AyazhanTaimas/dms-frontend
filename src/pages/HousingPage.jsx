import React, { useState } from "react";
import "../styles/HousingPage.css";

const HousingPage = ({ setIsSettled }) => {
    const [housingInfo, setHousingInfo] = useState({
        building: "",
        floor: "",
        room: ""
    });

    const buildings = ["Корпус 1", "Корпус 2", "Корпус 3"];
    const floors = ["Этаж 1", "Этаж 2", "Этаж 3", "Этаж 4"];
    const rooms = ["Комната 101", "Комната 102", "Комната 103", "Комната 104"];

    const handleSettle = () => {
        setIsSettled(true);
    };

    return (
        <div className="housing-container">
            <h1 className="housing-title">Выбор Комнаты</h1>
            <div className="selection-container">
                <div className="selection-block">
                    <h2>Корпус</h2>
                    <select onChange={(e) => setHousingInfo(prev => ({ ...prev, building: e.target.value }))} className="selection-dropdown">
                        <option value="">Выберите корпус</option>
                        {buildings.map((building, index) => (
                            <option key={index} value={building}>{building}</option>
                        ))}
                    </select>
                </div>
                <div className="selection-block">
                    <h2>Этаж</h2>
                    <select onChange={(e) => setHousingInfo(prev => ({ ...prev, floor: e.target.value }))} disabled={!housingInfo.building} className="selection-dropdown">
                        <option value="">Выберите этаж</option>
                        {floors.map((floor, index) => (
                            <option key={index} value={floor}>{floor}</option>
                        ))}
                    </select>
                </div>
                <div className="selection-block">
                    <h2>Комната</h2>
                    <select onChange={(e) => setHousingInfo(prev => ({ ...prev, room: e.target.value }))} disabled={!housingInfo.floor} className="selection-dropdown">
                        <option value="">Выберите комнату</option>
                        {rooms.map((room, index) => (
                            <option key={index} value={room}>{room}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button className="settle-button" disabled={!housingInfo.room} onClick={handleSettle}>Заселиться</button>
        </div>
    );
};

export default HousingPage;

