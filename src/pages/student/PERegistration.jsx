import React, { useState, useEffect } from "react";
import "../../styles/student/PERegistration.css";
import API from "../../api.js";

const PERegistrationPage = () => {
    const [booking, setBooking] = useState(null);
    const [recoveries, setRecoveries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isRecoveryMode, setIsRecoveryMode] = useState(false);

    const [sport, setSport] = useState("");
    const [day, setDay] = useState([]);
    const [time, setTime] = useState("");

    const weekdays = [
        "Понедельник", "Вторник", "Среда",
        "Четверг", "Пятница", "Суббота",
    ];

    const fetchData = () => {
        setLoading(true);
        API.get("/student/sports-page")
            .then((res) => {
                setBooking(res.data.booking);
                setRecoveries(res.data.recoveries);
            })
            .catch((err) => {
                console.error("Ошибка при загрузке данных:", err);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleMainSubmit = (e) => {
        e.preventDefault();
        if (day.length === 0 || !sport || !time) return;

        API.post("/student/gym-booking", {
            sport,
            day,
            time,
        })
            .then(() => {
                closeAddModal();
                fetchData();
            })
            .catch((err) => {
                console.error("Ошибка при записи:", err);
                alert(err.response?.data?.message || "Ошибка при записи");
            });
    };

    const handleRecoverySubmit = (e) => {
        e.preventDefault();
        if (recoveries.length > 0) {
            alert("Вы уже записаны на отработку.");
            return;
        }

        if (!sport || !time) return;

        API.post("/student/recovery", {
            recoverySport: sport,
            recoveryDay: day[0],
            recoveryTime: time,
        })
            .then(() => {
                closeAddModal();
                fetchData();
            })
            .catch((err) => {
                console.error("Ошибка при записи на отработку:", err);
                alert(err.response?.data?.message || "Ошибка при записи на отработку");
            });
    };

    const handleCancelBooking = () => {
        if (window.confirm("Вы уверены, что хотите отменить запись?")) {
            API.delete("/student/gym-booking")
                .then(() => fetchData())
                .catch((err) => {
                    console.error("Ошибка при отмене записи:", err);
                    alert(err.response?.data?.message || "Ошибка при отмене");
                });
        }
    };

    const handleCancelRecovery = (id) => {
        if (window.confirm("Вы уверены, что хотите отменить отработку?")) {
            API.delete(`/student/recovery/${id}`)
                .then(() => fetchData())
                .catch((err) => {
                    console.error("Ошибка при отмене отработки:", err);
                    alert(err.response?.data?.message || "Ошибка при отмене отработки");
                });
        }
    };

    const openAddModal = (recovery = false) => {
        if (recovery && recoveries.length > 0) {
            alert("У вас уже есть отработка.");
            return;
        }

        setSport("");
        setDay([]);
        setTime("");
        setIsRecoveryMode(recovery);
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    return (
        <div className="pe-registration-container">
            <div className="pe-registration-header">
                <h2>Запись на занятия спортом</h2>
            </div>

            {!booking && (
                <div className="registration-form-inline">
                    <form className="inline-form" onSubmit={handleMainSubmit}>
                        <label>
                            Вид спорта:
                            <select
                                value={sport}
                                onChange={(e) => setSport(e.target.value)}
                                required
                            >
                                <option value="">Выберите</option>
                                <option value="Футбол">Футбол</option>
                                <option value="Баскетбол">Баскетбол</option>
                                <option value="Волейбол">Волейбол</option>
                                <option value="Плавание">Плавание</option>
                            </select>
                        </label>

                        <label>
                            Дни недели:
                            <select
                                multiple
                                value={day}
                                onChange={(e) => {
                                    const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
                                    setDay(selected);
                                }}
                                required
                            >
                                {weekdays.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Время:
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            />
                        </label>

                        <button type="submit">Записаться</button>
                    </form>
                </div>
            )}

            {loading ? (
                <p>Загрузка...</p>
            ) : booking ? (
                <div className="booking-info">
                    <p><strong>Вид спорта:</strong> {booking.sport}</p>
                    <p><strong>Дни:</strong> {booking.day}</p>
                    <p><strong>Время:</strong> {booking.scheduled_time}</p>
                    <p><strong>Статус:</strong> {booking.status}</p>
                    <button className="cancel-button" onClick={handleCancelBooking}>
                        Отменить запись
                    </button>
                </div>
            ) : (
                <p>Вы не записаны на занятия.</p>
            )}

            <div className="recovery-header">
                <h3>Отработки</h3>
                {recoveries.length === 0 && (
                    <button className="add-button" onClick={() => openAddModal(true)}>+</button>
                )}
            </div>

            {recoveries.length > 0 ? (
                <ul>
                    <div className="recovery-list">
                        {recoveries.map((r) => (
                            <li key={r.id}>
                                {r.sport} — {r.recovery_day} — {r.scheduled_time}
                                <button
                                    className="cancel-button small"
                                    onClick={() => handleCancelRecovery(r.id)}
                                >
                                    Удалить
                                </button>
                            </li>

                        ))}
                    </div>
                </ul>
                ) : (
                <p>Нет отработок</p>
            )}

            {isAddModalOpen && (
                <div className="modal-overlay" onClick={closeAddModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h3>{isRecoveryMode ? "Запись на отработку" : "Запись на спорт"}</h3>
                        <form onSubmit={isRecoveryMode ? handleRecoverySubmit : handleMainSubmit}>
                            <label>
                                Вид спорта:
                                <select
                                    value={sport}
                                    onChange={(e) => setSport(e.target.value)}
                                    required
                                >
                                    <option value="">Выберите</option>
                                    <option value="Футбол">Футбол</option>
                                    <option value="Баскетбол">Баскетбол</option>
                                    <option value="Волейбол">Волейбол</option>
                                    <option value="Плавание">Плавание</option>
                                </select>
                            </label>

                            {!isRecoveryMode && (
                                <label>
                                    День недели:
                                    <select
                                        value={day}
                                        onChange={(e) => setDay([e.target.value])} // сохраняем как массив из одного элемента
                                        required
                                    >
                                        <option value="">Выберите</option>
                                        {weekdays.map((d) => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </label>
                            )}

                            <label>
                                Время:
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    required
                                />
                            </label>

                            <div className="modal-buttons">
                                <button type="button" onClick={closeAddModal}>
                                    Отмена
                                </button>
                                <button type="submit">Записаться</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PERegistrationPage;



