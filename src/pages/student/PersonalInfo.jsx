import React, { useEffect, useRef, useState } from "react";
import "../../styles/student/PersonalInfo.css";
import ChangePasswordForPersonalInfo from "../../components/ChangePasswordForPersonalInfo.jsx";
import API from "../../api.js";

const PersonalInfo = () => {
    const [data, setData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [photoFile, setPhotoFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        API.get("/student/data")
            .then((response) => {
                setData(response.data);
                setPreviewUrl(response.data.photo); // Прямой путь к изображению
            })
            .catch((error) => {
                console.error("Ошибка при загрузке данных пользователя:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleChange = (field, value) => {
        setData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSave = async () => {
        const formData = new FormData();
        if (photoFile) {
            formData.append("photo", photoFile);
        }

        try {
            await API.put("/student/update-phone", { phone: data.phone });
            alert("Данные успешно обновлены.");

            if (photoFile) {
                const photoResponse = await API.post("/student/update-photo", formData);
                if (photoResponse.data.photo) {
                    setPreviewUrl(photoResponse.data.photo);
                }
            }
        } catch (error) {
            console.error("Ошибка при обновлении данных:", error);
            alert("Не удалось обновить данные.");
        }
    };

    if (loading) {
        return <div className="personal-info-container">Загрузка...</div>;
    }

    if (!data) {
        return <div className="personal-info-container">Данные не найдены</div>;
    }

    return (
        <div className="personal-info-container">
            <h2 className="personal-info-header">Личные данные</h2>

            <div className="personal-info-content">
                <img
                    src={previewUrl || "/avatar.png"}
                    alt="User"
                    className="personal-info-avatar"
                    onClick={handleAvatarClick}
                    style={{ cursor: "pointer" }}
                />
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
                <div className="personal-info-details">
                    <h3 className="personal-info-name">{data.name}</h3>
                    <p className="personal-info-status">
                        Статус: Проживающий<br />
                    </p>
                </div>
            </div>

            <div className="personal-info-fields">
                <div className="personal-info-field">
                    <label>ID</label>
                    <input
                        type="text"
                        value={data.user_id}
                        className="personal-info-input"
                        readOnly
                    />
                </div>

                <div className="personal-info-field">
                    <label>Номер телефона</label>
                    <input
                        type="text"
                        value={data.phone || ""}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="personal-info-input"
                    />
                </div>
            </div>

            <div className="personal-info-fields">
                <div className="personal-info-field">
                    <label>E-Mail</label>
                    <input
                        type="text"
                        value={data.email}
                        className="personal-info-input"
                        readOnly
                    />
                </div>

                <div className="personal-info-password">
                    <label>Пароль</label>
                    <button
                        className="personal-info-password-btn"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Изменить
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <ChangePasswordForPersonalInfo onClose={() => setIsModalOpen(false)} />
            )}

            <button className="personal-info-save-btn" onClick={handleSave}>
                Сохранить изменения
            </button>
        </div>
    );
};

export default PersonalInfo;
