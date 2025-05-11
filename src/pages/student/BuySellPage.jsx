import React, { useState } from "react";

const mockListings = [
    {
        id: 1,
        title: "iPhone 14",
        price: 350000,
        image: "/public/Iphone.jpg",
        category: "electronics",
        contact: "example1@gmail.com"
    },
    {
        id: 2,
        title: "Велосипед",
        price: 90000,
        image: "/public/bike.jpg.avif",
        category: "transport",
        contact: "+7 777 123 4567"
    },
    {
        id: 3,
        title: "Адаптер",
        price: 9000,
        image: "/public/images-8.jpeg",
        category: "electronics",
        contact: "example2@gmail.com"
    },
];

const BuySellPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [newTitle, setNewTitle] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newContact, setNewContact] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newImage, setNewImage] = useState(null);
    const [listings, setListings] = useState(mockListings);

    const filteredListings = listings.filter(
        (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (category ? item.category === category : true)
    );

    const handleAddListing = () => {
        if (!newTitle || !newPrice || !newContact) return;

        const newListing = {
            id: Date.now(),
            title: newTitle,
            price: parseFloat(newPrice),
            image: newImage ? URL.createObjectURL(newImage) : "/public/default.jpg", // fallback
            category: "other",
            contact: newContact,
            description: newDescription,
        };

        setListings([newListing, ...listings]);
        setShowModal(false);
        setNewTitle("");
        setNewPrice("");
        setNewContact("");
        setNewDescription("");
        setNewImage(null);
    };

    return (
        <div style={styles.container}>
            {/* Заголовок и кнопка + */}
            <div style={styles.header}>
                <h1 style={styles.title}>Купи-Продай</h1>
                <div style={styles.headerRight}>
                    <input
                        type="text"
                        placeholder="Поиск..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                    />
                    <button style={styles.addButton} onClick={() => setShowModal(true)}>+</button>
                </div>
            </div>

            {/* Select фильтр */}
            <div style={styles.selectContainer}>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={styles.select}
                >
                    <option value="">Все категории</option>
                    <option value="electronics">Электроника</option>
                    <option value="transport">Транспорт</option>
                    <option value="clothes">Одежда</option>
                </select>
            </div>

            {/* Список объявлений */}
            <div style={styles.listings}>
                {filteredListings.length > 0 ? (
                    filteredListings.map((item) => (
                        <div key={item.id} style={styles.card}>
                            <img src={item.image} alt={item.title} style={styles.image} />
                            <div style={styles.info}>
                                <h3 style={styles.itemTitle}>{item.title}</h3>
                                <p style={styles.price}>{item.price.toLocaleString()} ₸</p>
                                <p style={styles.contact}>{item.contact}</p> {/* Новая строка */}
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={styles.noResults}>Нет объявлений по вашему запросу.</p>
                )}
            </div>

            {/* Модальное окно */}
            {showModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h2>Новое объявление</h2>
                        <input
                            type="text"
                            placeholder="Заголовок"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            style={styles.modalInput}
                        />
                        <input
                            type="number"
                            placeholder="Цена"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            style={styles.modalInput}
                        />
                        <input
                            type="text"
                            placeholder="Контакты (e-mail или номер телефона)"
                            value={newContact}
                            onChange={(e) => setNewContact(e.target.value)}
                            style={styles.modalInput}
                        />
                        <textarea
                            placeholder="Описание"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            style={{...styles.modalInput, height: "80px"}}
                        />
                        <input
                            type="file"
                            onChange={(e) => setNewImage(e.target.files[0])}
                            style={styles.modalInput}
                        />
                        <div style={styles.modalButtons}>
                            <button onClick={() => setShowModal(false)} style={styles.cancelButton}>Отмена</button>
                            <button onClick={handleAddListing} style={styles.submitButton}>
                                Отправить
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "white",
        borderRadius: "10px",
        marginLeft: "-230px",
        marginTop: "-870px"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        margin: 0,
    },
    headerRight: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    searchInput: {
        padding: "8px",
        fontSize: "14px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        margin: "0px 30px"
    },
    addButton: {
        backgroundColor: "#6545e0",
        color: "#fff",
        fontSize: "20px",
        border: "none",
        borderRadius: "4px",
        padding: "6px 12px",
        cursor: "pointer",
        margin: "-10px 30px ",
    },
    selectContainer: {
        margin: "30px 0",
    },
    select: {
        padding: "8px",
        fontSize: "14px",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    listings: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    card: {
        display: "flex",
        alignItems: "center",
        gap: "15px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        padding: "10px",
    },
    image: {
        width: "100px",
        height: "100px",
        objectFit: "cover",
        borderRadius: "4px",
    },
    info: {
        display: "flex",
        flexDirection: "column",
    },
    itemTitle: {
        margin: 0,
        fontSize: "18px",
    },
    price: {
        margin: "6px 0 0",
        color: "#555",
    },
    noResults: {
        fontStyle: "italic",
        color: "#999",
    },
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modal: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        width: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    modalInput: {
        width: "100%",
        padding: "10px",
        fontSize: "14px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        boxSizing: "border-box", // чтобы padding не ломал ширину
    },
    modalButtons: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        marginTop: "10px",
    },
    cancelButton: {
        backgroundColor: "#ccc",
        border: "none",
        padding: "8px 12px",
        borderRadius: "4px",
        cursor: "pointer",
    },
    submitButton: {
        backgroundColor: "#6545e0",
        color: "#fff",
        border: "none",
        padding: "8px 12px",
        borderRadius: "4px",
        cursor: "pointer",
    },
    contact: {
        margin: "4px 0 0",
        fontSize: "14px",
        color: "#333",
    },
};

export default BuySellPage;