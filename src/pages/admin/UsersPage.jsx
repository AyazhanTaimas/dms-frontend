import { useState } from "react";
import "../../styles/admin/UsersPage.css";
import AddUsers from "../../components/AddUsers";
import UsersInformation from "../../components/UsersInformation";

const users = [
    { id: 1, name: "Иванов Иван", email: "ivanov@example.com", status: "Активен" },
    { id: 2, name: "Петрова Мария", email: "petrova@example.com", status: "Неактивен" },
    { id: 3, name: "Султанов Ерлан", email: "sultanov@example.com", status: "Активен" }
];

const UsersPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    return (
        <div className="user-list-container">
            <div className="user-list-header">
                <h2 className="user-list-title">Список пользователей</h2>
                <button className="user-add-button" onClick={() => setIsModalOpen(true)}>
                    +
                </button>
            </div>

            <div className="user-table-header">
                <div>ID</div>
                <div>ФИО</div>
                <div>E-mail</div>
                <div>Статус</div>
            </div>

            {users.map((user) => (
                <div key={user.id} className="user-table-row">
                    <div>{user.id}</div>
                    <div>
                        <button className="user-name-button" onClick={() => handleUserClick(user)}>
                            {user.name}
                        </button>
                    </div>
                    <div>{user.email}</div>
                    <div>{user.status}</div>
                </div>
            ))}

            <AddUsers isOpen={false} onClose={() => {}} />

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>×</button>
                        <UsersInformation user={selectedUser} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersPage;