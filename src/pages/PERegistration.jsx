import { useState } from "react";
import "../styles/PERegistration.css";

const PERegistrationPage = () => {
    const [sport, setSport] = useState("");
    const [date, setDate] = useState("");
    const [autoEnroll, setAutoEnroll] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Запись: Вид спорта: ${sport}, Дата: ${date}, Авто-запись: ${autoEnroll}`);
        alert("Вы успешно записались на занятие!");
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
                    Дата занятия:
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </label>

                <button type="submit">Записаться</button>
            </form>
        </div>
    );
};

export default PERegistrationPage;
