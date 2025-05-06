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
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false); // для AddUsers
    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setIsUserModalOpen(true); // открыть модальное окно с UsersInformation
    };

    const handleAddUserClick = () => {
        setIsAddUserModalOpen(true); // открыть модальное окно с AddUsers
    };

    return (
        <div className="user-list-container">
            <div className="user-list-header">
                <h2 className="user-list-title">Список пользователей</h2>
                <button className="user-add-button" onClick={handleAddUserClick}>
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

            {/* Отображаем AddUsers модалку при isAddUserModalOpen */}
            {isAddUserModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close-btn" onClick={() => setIsAddUserModalOpen(false)}>
                            ×
                        </button>
                        <AddUsers onClose={() => setIsAddUserModalOpen(false)} />
                    </div>
                </div>
            )}

            {/* Отображаем UsersInformation модалку при isUserModalOpen */}
            {isUserModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close-btn" onClick={() => setIsUserModalOpen(false)}>
                            ×
                        </button>
                        <UsersInformation user={selectedUser} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersPage;
