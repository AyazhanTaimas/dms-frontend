import { Link } from "react-router-dom";
//import "../styles/admin/UsersPage.css";

const users = [
    { id: 1, name: "Иванов Иван", email: "ivanov@example.com", status: "Активен" },
    { id: 2, name: "Петрова Мария", email: "petrova@example.com", status: "Неактивен" },
    { id: 3, name: "Султанов Ерлан", email: "sultanov@example.com", status: "Активен" }
];

const UsersPage = () => {
    return (
        <div className="p-6 bg-white shadow-xl rounded-2xl">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Список пользователей</h2>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm">
                    + Добавить
                </button>
            </div>

            {/* Заголовки колонок */}
            <div className="grid grid-cols-4 font-semibold text-gray-600 border-b pb-2">
                <div>ID</div>
                <div>ФИО</div>
                <div>E-mail</div>
                <div>Статус</div>
            </div>

            {/* Список студентов */}
            {users.map((user) => (
                <div key={user.id} className="grid grid-cols-4 py-2 border-b hover:bg-gray-50">
                    <div>{user.id}</div>
                    <div>
                        <Link to={`/users/${user.id}`} className="text-blue-600 hover:underline">
                            {user.name}
                        </Link>
                    </div>
                    <div>{user.email}</div>
                    <div>{user.status}</div>
                </div>
            ))}
        </div>
    );
};

export default UsersPage;