import React, { useEffect, useState } from "react";
import API from "../../api.js";

import "../../styles/student/HousingPage.css";

const HousingPage = ({ setIsSettled }) => {
    const [housingInfo, setHousingInfo] = useState({
        building: "",
        floor: "",
        room: ""
    });

    const [buildings, setBuildings] = useState([]);
    const [floors, setFloors] = useState([]);
    const [rooms, setRooms] = useState([]);

    const [applicationStatus, setApplicationStatus] = useState(null);

    // Загрузка корпусов
    useEffect(() => {
        API.get("/student/buildings")
            .then(res => {
                if (res.status === 200 && Array.isArray(res.data)) {
                    setBuildings(res.data);
                } else if (res.data.buildings) {
                    setBuildings(res.data.buildings);
                } else {
                    setBuildings([]);
                    console.error("Некорректный формат ответа от /student/buildings", res.data);
                }
            })
            .catch(err => {
                console.error("Ошибка при загрузке корпусов", err);
                setBuildings([]);
                alert("Ошибка при загрузке данных.");
            });
    }, []);

    // Загрузка этажей
    useEffect(() => {
        if (housingInfo.building) {
            API.get(`/student/floors/${housingInfo.building}`)
                .then(res => {
                    setFloors(res.data.floors || []);
                })
                .catch(err => {
                    console.error("Ошибка при загрузке этажей", err);
                    setFloors([]);
                });
        } else {
            setFloors([]);
        }
    }, [housingInfo.building]);

    // Загрузка комнат
    useEffect(() => {
        if (housingInfo.building && housingInfo.floor) {
            API.get(`/student/rooms/${housingInfo.building}/${housingInfo.floor}`)
                .then(res => {
                    setRooms(res.data.rooms || []);
                })
                .catch(err => {
                    console.error("Ошибка при загрузке комнат", err);
                    setRooms([]);
                });
        } else {
            setRooms([]);
        }
    }, [housingInfo.building, housingInfo.floor]);

    // Отправка заявки
    const handleSettle = () => {
        API.post('/student/booking', {
            building_id: housingInfo.building,
            floor: housingInfo.floor,
            room_id: housingInfo.room
        }).then(() => {
            alert("Заявка успешно отправлена. Ожидайте подтверждения.");
            setApplicationStatus("pending");
        }).catch(err => {
            alert("Ошибка при отправке заявки");
            console.error(err);
        });
    };

    // Проверка статуса заявки
    useEffect(() => {
        let intervalId;

        const checkStatus = async () => {
            try {
                const res = await API.get('/manager/booking/accept/5');
                if (res.status === 200 && res.data.status === "accepted") {
                    setIsSettled(true); // Заявка принята, открываем доступ
                    clearInterval(intervalId); // Останавливаем проверку
                } else {
                    setApplicationStatus(res.data.status);
                }
            } catch (error) {
                console.error("Ошибка при получении статуса заявки", error);
                clearInterval(intervalId); // Прекращаем проверку при ошибке
            }
        };

        if (applicationStatus === "pending") {
            checkStatus(); // Проверим сразу один раз
            intervalId = setInterval(checkStatus, 5000); // И начнём интервал
        }

        return () => clearInterval(intervalId);
    }, [applicationStatus]);


    return (
        <div className="housing-container">
            <h1 className="housing-title">Выбор Комнаты</h1>
            <div className="selection-container">
                <div className="selection-block">
                    <h2>Корпус</h2>
                    <select
                        onChange={(e) =>
                            setHousingInfo(prev => ({
                                ...prev,
                                building: e.target.value,
                                floor: "",
                                room: ""
                            }))
                        }
                        className="selection-dropdown"
                        value={housingInfo.building}
                    >
                        <option value="">Выберите корпус</option>
                        {buildings.map((building) => (
                            <option key={building.id} value={building.id}>
                                {building.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="selection-block">
                    <h2>Этаж</h2>
                    <select
                        onChange={(e) =>
                            setHousingInfo(prev => ({
                                ...prev,
                                floor: e.target.value,
                                room: ""
                            }))
                        }
                        disabled={!housingInfo.building}
                        className="selection-dropdown"
                        value={housingInfo.floor}
                    >
                        <option value="">Выберите этаж</option>
                        {floors.map((floor, index) => (
                            <option key={index} value={floor}>
                                {floor}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="selection-block">
                    <h2>Комната</h2>
                    <select
                        onChange={(e) =>
                            setHousingInfo(prev => ({
                                ...prev,
                                room: e.target.value
                            }))
                        }
                        disabled={!housingInfo.floor}
                        className="selection-dropdown"
                        value={housingInfo.room}
                    >
                        <option value="">Выберите комнату</option>
                        {rooms.map((room) => (
                            <option key={room.id} value={room.id}>
                                {room.room_number} ({room.occupied_places}/{room.capacity})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                className="settle-button"
                disabled={!housingInfo.room || applicationStatus === "pending"}
                onClick={handleSettle}
            >
                Заселиться
            </button>
        </div>
    );
};

export default HousingPage;
