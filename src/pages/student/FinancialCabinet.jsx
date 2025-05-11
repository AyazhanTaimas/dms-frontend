import React, { useState } from "react";
import "../../styles/student/FinancialCabinet.css";

const FinancialCabinet = () => {
    const [testAmount, setTestAmount] = useState("");
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    const handleTestPayment = () => {
        if (!testAmount) return;

        const newPayment = {
            date: new Date().toLocaleDateString("ru-RU"),
            amount: `${testAmount} ₸`,
            method: "Тестовая оплата",
        };

        setPaymentHistory((prev) => [...prev, newPayment]);
        setTestAmount("");
        setShowHistory(true);
    };

    return (
        <div className="financial-container">
            <div className="cards-row">
                {/* Текущий баланс */}
                <div className="card balance-card">
                    <h3 className="text balance">Текущий баланс</h3>
                    <p className="balance-amount">25 000 ₸</p>
                </div>

                {/* Оплата через Kaspi */}
                <div className="card kaspi-card">
                    <h3 className="text payment">Оплата через Kaspi</h3>
                    <img
                        src="/public/kaspiqr.JPG"
                        alt="Kaspi QR"
                        className="kaspi-image"
                    />
                    <p>Отсканируйте QR-код для оплаты</p>
                </div>

                {/* Тестовая оплата */}
                <div className="card test-payment-card">
                    <h3 className="text testing">Тестовая оплата</h3>
                    <p className="warning-text">⚠️ Тестовый режим: реальные платежи не проводятся</p>
                    <label htmlFor="testAmount">Сумма оплаты (₸):</label>
                    <input
                        id="testAmount"
                        type="number"
                        value={testAmount}
                        onChange={(e) => setTestAmount(e.target.value)}
                        className="test-amount-input"
                        placeholder="Введите сумму"
                    />
                    <button className="pay-button" onClick={handleTestPayment}>
                        Тестовая оплата
                    </button>
                </div>
            </div>

            {/* История тестовых платежей */}
            {showHistory && (
                <div className="history-container">
                    <h3>История тестовых платежей</h3>
                    <table className="history-table">
                        <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Сумма</th>
                            <th>Способ оплаты</th>
                        </tr>
                        </thead>
                        <tbody>
                        {paymentHistory.map((payment, index) => (
                            <tr key={index}>
                                <td>{payment.date}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.method}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default FinancialCabinet;