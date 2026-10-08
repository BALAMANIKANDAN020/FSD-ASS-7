const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

let account = {
    balance: 1000,
    owner: "John Doe",
    transactions: []
};

// Get account details
app.get('/api/account', (req, res) => {
    res.json(account);
});

// Deposit money
app.post('/api/deposit', (req, res) => {
    const { amount } = req.body;
    if (amount > 0) {
        account.balance += amount;
        account.transactions.push({ type: 'Deposit', amount, date: new Date() });
        res.json({ message: 'Deposit successful', balance: account.balance });
    } else {
        res.status(400).json({ message: 'Invalid amount' });
    }
});

// Withdraw money
app.post('/api/withdraw', (req, res) => {
    const { amount } = req.body;
    if (amount > 0 && amount <= account.balance) {
        account.balance -= amount;
        account.transactions.push({ type: 'Withdrawal', amount, date: new Date() });
        res.json({ message: 'Withdrawal successful', balance: account.balance });
    } else {
        res.status(400).json({ message: 'Invalid amount or insufficient funds' });
    }
});

app.listen(port, () => {
    console.log(`Banking application running at http://localhost:${port}`);
});
