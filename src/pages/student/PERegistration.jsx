import { useState } from "react";
import "../../styles/student/PERegistration.css";

const PERegistrationPage = () => {
    const [sport, setSport] = useState("");
    const [date, setDate] = useState("");
    const [autoEnroll, setAutoEnroll] = useState(false);
    const [makeups, setMakeups] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [makeupSport, setMakeupSport] = useState("");
    const [makeupDate, setMakeupDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Вы успешно записались на занятие!");
        console.log(`Запись: Вид спорта: ${sport}, Дата: ${date}, Авто-запись: ${autoEnroll}`);
    };

    const handleMakeupAdd = () => {
        if (makeupSport && makeupDate) {
            setMakeups([...makeups, { sport: makeupSport, date: makeupDate }]);
            setMakeupSport("");
            setMakeupDate("");
            setIsModalOpen(false);
        }
    };

    return (
        <div className="pe-registration">
            <h1>Запись на спортивное занятие</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Вид спорта:
                    <select value={sport} onChange={(e) => setSport(e.target.value)} required>
                        <option value="">Выберите вид спорта</option>
                        <option value="Футбол">Футбол</option>
                        <option value="Баскетбол">Баскетбол</option>
                        <option value="Волейбол">Волейбол</option>
                        <option value="Лёгкая атлетика">Лёгкая атлетика</option>
                        <option value="Плавание">Плавание</option>
                    </select>
                </label>

                <label>
                    Дата и время:
                    <input
                        type="datetime-local"
                        value={date}
                        onChange={(e) => {
                            const selected = new Date(e.target.value);
                            selected.setMinutes(0, 0, 0);
                            const formatted = selected.toISOString().slice(0, 16);
                            setDate(formatted);
                        }}
                        step="3600"
                        required
                    />
                </label>

                <button type="submit">Записаться</button>
            </form>

            <div className="makeup-container">
                <div className="makeup-header">
                    <h2>Отработка занятия</h2>
                    <button className="add-btn" onClick={() => setIsModalOpen(true)}>+</button>
                </div>

                {makeups.length === 0 ? (
                    <p>У вас нет запланированных уроков</p>
                ) : (
                    <ul className="makeup-list">
                        {makeups.map((m, i) => (
                            <li key={i}>
                                {m.sport} — {new Date(m.date).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Запись на отработку</h3>
                        <label>
                            Вид спорта:
                            <select value={makeupSport} onChange={(e) => setMakeupSport(e.target.value)} required>
                                <option value="">Выберите вид спорта</option>
                                <option value="Футбол">Футбол</option>
                                <option value="Баскетбол">Баскетбол</option>
                                <option value="Волейбол">Волейбол</option>
                                <option value="Лёгкая атлетика">Лёгкая атлетика</option>
                                <option value="Плавание">Плавание</option>
                            </select>
                        </label>

                        <label>
                            Дата и время:
                            <input
                                type="datetime-local"
                                value={makeupDate}
                                onChange={(e) => {
                                    const selected = new Date(e.target.value);
                                    selected.setMinutes(0, 0, 0);
                                    const formatted = selected.toISOString().slice(0, 16);
                                    setMakeupDate(formatted);
                                }}
                                step="3600"
                                required
                            />
                        </label>

                        <div className="modal-buttons">
                            <button onClick={handleMakeupAdd}>Сохранить</button>
                            <button onClick={() => setIsModalOpen(false)}>Отмена</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PERegistrationPage;