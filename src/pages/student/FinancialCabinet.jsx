import React, { useState } from "react";
import "../../styles/student/FinancialCabinet.css";

const pastPayments = [
    { id: 1, paymentId: "123456", month: "Март", date: "25.03.2025", link: "#" },
    { id: 2, paymentId: "789012", month: "Февраль", date: "25.02.2025", link: "#" },
    { id: 3, paymentId: "345678", month: "Январь", date: "25.01.2025", link: "#" },
];

const upcomingPayments = [
    { id: 1, month: "Апрель", dueDate: "10.04.2025", price: "20 000 ₸" },
];

const FinancialCabinet = () => {
    const [period, setPeriod] = useState("");

    return (
        <div className="financial-container">
            <h2 className="financial-title">Предыдущие оплаты</h2>

            {/* Выбор периода */}
            <div className="period-section">
                <select
                    className="period-select"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                >
                    <option value="">Выбрать период</option>
                    <option value="last3">Последние 3 месяца</option>
                    <option value="last6">Последние 6 месяцев</option>
                    <option value="last12">Последний год</option>
                </select>
            </div>

            {/* Контейнер с оплатами */}
            <div className="payments-container">
                {/* Предыдущие оплаты */}
                <div className="past-payments">
                    <table className="payments-table">
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>ID оплаты</th>
                            <th>Ссылка на чек</th>
                            <th>Дата оплаты</th>
                        </tr>
                        </thead>
                        <tbody>
                        {pastPayments.map((payment, index) => (
                            <tr key={payment.id}>
                                <td>{index + 1}</td>
                                <td>{payment.paymentId}</td>
                                <td>
                                    <a href={payment.link} className="payment-link">Оплата за {payment.month}</a>
                                </td>
                                <td>{payment.date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Предстоящие оплаты */}
                <div className="upcoming-payments">
                    <h3>Предстоящие оплаты</h3>
                    {upcomingPayments.map((payment) => (
                        <div key={payment.id} className="upcoming-payment">
                            <p><strong>Оплата за:</strong> {payment.month}</p>
                            <p><strong>Дата до:</strong> {payment.dueDate}</p>
                            <p><strong>Цена:</strong> {payment.price}</p>
                            <button className="pay-button">Оплатить</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FinancialCabinet;
