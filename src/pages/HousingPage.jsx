import React, { useState } from "react";
import "../styles/HousingPage.css";

const HousingPage = () => {
    const [selectedBuilding, setSelectedBuilding] = useState("");
    const [selectedFloor, setSelectedFloor] = useState("");
    const [selectedRoom, setSelectedRoom] = useState("");

    const buildings = ["Корпус 1", "Корпус 2", "Корпус 3"];
    const floors = ["Этаж 1", "Этаж 2", "Этаж 3", "Этаж 4"];
    const rooms = ["Комната 101", "Комната 102", "Комната 103", "Комната 104"];

    return (
        <div className="housing-container">
            <h1 className="housing-title">Выбор Комнаты</h1>

            <div className="selection-container">
                {/* Выбор корпуса */}
                <div className="selection-block">
                    <h2>Корпус</h2>
                    <select
                        onChange={(e) => setSelectedBuilding(e.target.value)}
                        className="selection-dropdown"
                    >
                        <option value="">Выберите корпус</option>
                        {buildings.map((building, index) => (
                            <option key={index} value={building}>{building}</option>
                        ))}
                    </select>
                </div>

                {/* Выбор этажа */}
                <div className="selection-block">
                    <h2>Этаж</h2>
                    <select
                        onChange={(e) => setSelectedFloor(e.target.value)}
                        disabled={!selectedBuilding}
                        className="selection-dropdown"
                    >
                        <option value="">Выберите этаж</option>
                        {floors.map((floor, index) => (
                            <option key={index} value={floor}>{floor}</option>
                        ))}
                    </select>
                </div>

                {/* Выбор комнаты */}
                <div className="selection-block">
                    <h2>Комната</h2>
                    <select
                        onChange={(e) => setSelectedRoom(e.target.value)}
                        disabled={!selectedFloor}
                        className="selection-dropdown"
                    >
                        <option value="">Выберите комнату</option>
                        {rooms.map((room, index) => (
                            <option key={index} value={room}>{room}</option>
                        ))}
                    </select>
                </div>

            </div>
            <button className="settle-button" disabled={!selectedRoom}>
                Заселиться
            </button>


        </div>
    );
};

export default HousingPage;

