import { useState, useEffect } from "react";
import "../../styles/admin/UsersPage.css";
import API from "../../api";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        name: "",
        user_id: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "",
    });

    const [filters, setFilters] = useState({
        name: "",
        user_id: "",
        email: "",
        role: "",
    });

    const role = localStorage.getItem("role");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        API.get("/manager/users")
            .then((res) => setUsers(res.data.users))
            .catch((err) => {
                console.error("Ошибка при загрузке пользователей:", err);
            });
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm("Вы уверены, что хотите удалить этого пользователя?")) {
            API.delete(`/manager/users/${userId}`)
                .then(() => {
                    alert("Пользователь удалён!");
                    fetchUsers();
                })
                .catch((err) => {
                    console.error("Ошибка при удалении пользователя:", err);
                    alert("Не удалось удалить пользователя.");
                });
        }
    };

    const handleAddUser = (e) => {
        e.preventDefault();

        API.post("/manager/register", {
            ...newUser,
            password_confirmation: newUser.password,
        })
            .then(() => {
                alert("Пользователь добавлен!");
                fetchUsers();
                setIsAddModalOpen(false);
                setNewUser({
                    name: "",
                    user_id: "",
                    email: "",
                    password: "",
                    password_confirmation: "",
                    role: "",
                });
            })
            .catch((err) => {
                console.error("Ошибка при добавлении пользователя:", err);
                alert("Не удалось добавить пользователя.");
            });
    };

    const filteredUsers = users.filter((user) => {
        return (
            user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
            user.user_id.toLowerCase().includes(filters.user_id.toLowerCase()) &&
            user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
            user.role.toLowerCase().includes(filters.role.toLowerCase())
        );
    });

    return (
        <div className="user-list-container">
            <div className="user-list-header">
                <h2 className="user-list-title">Список пользователей</h2>
                {role === "admin" && (
                    <button className="add-user-btn" onClick={() => setIsAddModalOpen(true)}>
                        Добавить пользователя
                    </button>
                )}
            </div>

            <div className="user-table-header">
                <div>
                    <input
                        type="text"
                        placeholder="Поиск по ID"
                        value={filters.user_id}
                        onChange={(e) => setFilters({ ...filters, user_id: e.target.value })}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Поиск по ФИО"
                        value={filters.name}
                        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Поиск по email"
                        value={filters.email}
                        onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Поиск по роли"
                        value={filters.role}
                        onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                    />
                </div>
                <div>Действия</div>
            </div>

            {filteredUsers.map((user) => (
                <div key={user.id} className="user-table-row">
                    <div>{user.user_id}</div>
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                    <div>{user.role}</div>
                    <div>
                        {role === "admin" && (
                            <button className="delete-user-btn" onClick={() => handleDeleteUser(user.id)}>
                                Удалить
                            </button>
                        )}
                    </div>
                </div>
            ))}

            {isAddModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}>
                            ×
                        </button>
                        <h3>Добавить пользователя</h3>
                        <form onSubmit={handleAddUser} className="add-user-form">
                            <input
                                type="text"
                                placeholder="ФИО"
                                value={newUser.name}
                                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="ID пользователя"
                                value={newUser.user_id}
                                onChange={(e) => setNewUser({ ...newUser, user_id: e.target.value })}
                                required
                            />
                            <input
                                type="email"
                                placeholder="E-mail"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Пароль"
                                value={newUser.password}
                                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                required
                            />
                            <select
                                value={newUser.role}
                                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                required
                            >
                                <option value="" disabled>Выберите роль</option>
                                <option value="admin">Admin</option>
                                <option value="student">Student</option>
                                <option value="employee">Employee</option>
                                <option value="manager">Manager</option>
                            </select>
                            <button type="submit">Создать</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersPage;

