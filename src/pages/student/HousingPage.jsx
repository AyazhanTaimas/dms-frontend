import React, { useEffect, useState } from "react";
import API from "../../api.js";
import "../../styles/student/HousingPage.css";
import HousingInfoPage from "../../components/HousingInfoPage.jsx";

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
    const [showInfo, setShowInfo] = useState(false);

    // Проверка текущего статуса при монтировании страницы
    useEffect(() => {
        API.get('/student/booking/status')
            .then(res => {
                const status = res.data.status;
                setApplicationStatus(status);

                if (status === "accepted") {
                    setIsSettled(true);
                    setShowInfo(true);
                }
            })
            .catch(err => {
                console.error("Ошибка при получении статуса при инициализации", err);
            });
    }, []);

    // Загрузка корпусов
    useEffect(() => {
        API.get("/student/buildings")
            .then(res => {
                if (res.status === 200 && Array.isArray(res.data)) {
                    setBuildings(res.data);
                } else if (res.data.buildings) {
                    setBuildings(res.data.buildings);
                } else {
                    console.error("Некорректный формат ответа от /student/buildings", res.data);
                    setBuildings([]);
                }
            })
            .catch(err => {
                console.error("Ошибка при загрузке корпусов", err);
                alert("Ошибка при загрузке данных.");
                setBuildings([]);
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
        })
            .then(() => {
                alert("Заявка успешно отправлена. Ожидайте подтверждения.");
                setApplicationStatus("pending");
            })
            .catch(err => {
                alert("Ошибка при отправке заявки");
                console.error(err);
            });
    };

    // Polling статуса заявки
    useEffect(() => {
        let intervalId;

        async function checkStatus() {
            try {
                const res = await API.get('/student/booking/status');
                const status = res.data.status;
                setApplicationStatus(status);

                if (status === "accepted") {
                    setIsSettled(true);
                    localStorage.setItem("isSettled", "true"); // ✅ сохраняем в localStorage
                    setShowInfo(true);
                }

            } catch (err) {
                console.error("Ошибка при проверке статуса", err);
                clearInterval(intervalId);
            }
        }

        if (applicationStatus === "pending") {
            intervalId = setInterval(checkStatus, 5000);
            checkStatus(); // сразу проверить при старте
        }

        return () => clearInterval(intervalId);
    }, [applicationStatus, setIsSettled]);

    // Показ информации, если заселён
    if (showInfo) {
        return <HousingInfoPage />;
    }

    return (
        <div className="housing-container">
            <h1 className="housing-title">Выбор Комнаты</h1>
            <div className="selection-container">
                <div className="selection-block">
                    <h2>Корпус</h2>
                    <select
                        value={housingInfo.building}
                        onChange={(e) => setHousingInfo(prev => ({
                            ...prev,
                            building: e.target.value,
                            floor: "",
                            room: ""
                        }))}
                        className="selection-dropdown"
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
                        value={housingInfo.floor}
                        disabled={!housingInfo.building}
                        onChange={(e) => setHousingInfo(prev => ({
                            ...prev,
                            floor: e.target.value,
                            room: ""
                        }))}
                        className="selection-dropdown"
                    >
                        <option value="">Выберите этаж</option>
                        {floors.map((floor, idx) => (
                            <option key={idx} value={floor}>{floor}</option>
                        ))}
                    </select>
                </div>

                <div className="selection-block">
                    <h2>Комната</h2>
                    <select
                        value={housingInfo.room}
                        disabled={!housingInfo.floor}
                        onChange={(e) => setHousingInfo(prev => ({
                            ...prev,
                            room: e.target.value
                        }))}
                        className="selection-dropdown"
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
