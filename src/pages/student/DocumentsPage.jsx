import React, { useEffect, useState } from "react";
import axios from "../../api"; // путь к API-обёртке
import "../../styles/student/DocumentPage.css";

const DocumentsPage = () => {
    const [documents, setDocuments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedType, setSelectedType] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const documentTypes = [
        "Удостоверение личности",
        "Загранпаспорт",
        "Студенческий билет",
        "Справка с места учебы",
    ];

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const response = await axios.get("/student/documents");
            setDocuments(response.data);
        } catch (error) {
            console.error("Ошибка при загрузке документов:", error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedType || !file) {
            alert("Выберите тип документа и прикрепите файл.");
            return;
        }

        const formData = new FormData();
        formData.append("documentFile", file);
        formData.append("type", selectedType);

        try {
            setLoading(true);
            await axios.post("/student/documents", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Документ успешно загружен!");
            setIsModalOpen(false);
            setSelectedType("");
            setFile(null);
            fetchDocuments();
        } catch (error) {
            console.error("Ошибка при загрузке документа:", error);
            alert("Не удалось загрузить документ.");
        } finally {
            setLoading(false);
        }
    };

    const getFileUrl = (url) => {
        return url.replace('/storage/documents/documents/', '/storage/documents/');
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
                {documents.map((doc, index) => (
                    <tr key={doc.id}>
                        <td>{index + 1}</td>
                        <td>{doc.type || "—"}</td>
                        <td>
                            <a
                                href={getFileUrl(doc.file_url)}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {doc.file_name || "Скачать"}
                            </a>
                        </td>
                        <td>{doc.valid_until || "—"}</td>
                        <td className={doc.status === "accepted" ? "accepted" : "pending"}>
                            {doc.status || "На проверке"}
                        </td>
                    </tr>
                ))}
                {documents.length === 0 && (
                    <tr>
                        <td colSpan="5">Нет загруженных документов</td>
                    </tr>
                )}
                </tbody>
            </table>

            <button className="upload-button" onClick={() => setIsModalOpen(true)}>
                Загрузить новый
            </button>

            {/* Модальное окно для загрузки нового документа */}
            {isModalOpen && (
                <div className="modal-container">
                    <div className="modal">
                        <h2>Новый документ</h2>
                        <select
                            className="document-select"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option value="">Выберите тип документа</option>
                            {documentTypes.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        <label className="file-upload">
                            <input type="file" onChange={handleFileChange} />
                            📎 Прикрепить файл
                        </label>
                        <div className="modal-buttons">
                            <button className="upload-btn" onClick={handleUpload} disabled={loading}>
                                {loading ? "Загрузка..." : "Загрузить"}
                            </button>
                            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                                Отменить
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentsPage;
