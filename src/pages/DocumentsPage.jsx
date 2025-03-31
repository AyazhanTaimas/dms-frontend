import React, { useState } from "react";
import "../styles/DocumentPage.css";

const DocumentsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedType, setSelectedType] = useState("");
    const [file, setFile] = useState(null);

    const documentTypes = [
        "Удостоверение личности",
        "Загранпаспорт",
        "Студенческий билет",
        "Справка с места учебы",
    ];

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedType && file) {
            alert(`Документ "${selectedType}" загружен!`);
            setIsModalOpen(false);
            setSelectedType("");
            setFile(null);
        } else {
            alert("Выберите тип документа и прикрепите файл.");
        }
    };

    return (
        <div className="documents-container">
            <h1 className="documents-title">Мои документы</h1>
            <table className="documents-table">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Тип</th>
                    <th>Файл</th>
                    <th>Годен до</th>
                    <th>Статус</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Удостоверение личности</td>
                    <td><a href="#">удо.pdf</a></td>
                    <td>24.06.2025</td>
                    <td className="accepted">Принят</td>
                </tr>
                </tbody>
            </table>
            <button className="upload-button" onClick={() => setIsModalOpen(true)}>
                Загрузить новый
            </button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Новый документ</h2>
                        <select
                            className="document-select"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option value="">Выберите тип документа</option>
                            {documentTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                        <label className="file-upload">
                            <input type="file" onChange={handleFileChange} />
                            📎 Прикрепить файл
                        </label>
                        <div className="modal-buttons">
                            <button className="upload-btn" onClick={handleUpload}>Загрузить</button>
                            <button className="modal-close" onClick={() => setIsModalOpen(false)}>Отменить</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentsPage;
