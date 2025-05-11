import React, { useEffect, useState } from "react";
import "../styles/student/AddRepairRequest.css";
import API from "../api.js";

const AddRepairRequest = ({ closeModal, addRequest }) => {
    const [formData, setFormData] = useState({
        type: "",
        description: "",
        file: null,
        employee: "",
    });

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get("/student/employees")
            .then((response) => {
                console.log("Список сотрудников с сервера:", response.data.data);
                setEmployees(response.data.data);
            })
            .catch((error) => {
                console.error("Ошибка при загрузке сотрудников:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevState) => ({
                ...prevState,
                file,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { type, description, employee, file } = formData;

        if (!type || !description || !employee) {
            alert("Пожалуйста, заполните все поля!");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("type", type);
        formDataToSend.append("description", description);
        formDataToSend.append("employee", employee); // отправляем employee.id
        if (file) {
            formDataToSend.append("file", file);
        }

        API.post("/student/request", formDataToSend)
            .then((response) => {
                console.log("Запрос успешно отправлен:", response.data);
                if (addRequest && typeof addRequest === "function") {
                    addRequest(formData);
                }
                closeModal();
            })
            .catch((error) => {
                console.error("Ошибка при отправке запроса:", error);
                alert("Произошла ошибка при отправке запроса. Попробуйте позже.");
            });
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Добавить новый запрос на ремонт</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="type">Тип запроса</label>
                        <input
                            type="text"
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Описание</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="file">Прикрепить файл</label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="employee">Выбрать сотрудника</label>
                        <select
                            id="employee"
                            name="employee"
                            value={formData.employee}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Выберите сотрудника --</option>
                            {employees.map((employee) => (
                                <option key={employee.employee_id} value={employee.employee_id}>
                                    {employee.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-buttons">
                        <button type="submit" className="submit-button">Сохранить</button>
                        <button type="button" className="cancel-button" onClick={closeModal}>Отменить</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRepairRequest;
