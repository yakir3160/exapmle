import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || authHeader !== 'Bearer token123') {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing token' });
  }
  next();
};

app.use(authMiddleware);

app.post('/order', (req, res) => {
  const { customerName, tableNumber, items } = req.body;
  if (!customerName || !tableNumber || !Array.isArray(items)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const order = {
    id: Math.floor(Math.random() * 1000000),
    customerName,
    tableNumber,
    items,
    receivedAt: new Date().toISOString(),
  };
  res.json(order);
});

app.get('/order/:id', (req, res) => {
  const { id } = req.params;
  const order = {
    id,
    customerName: 'Demo Customer',
    tableNumber: 1,
    items: ['פיצה מרגריטה', 'סלט יווני', 'קוקה קולה', 'טירמיסו'],
    receivedAt: new Date().toISOString(),
  };
  res.json(order);
});

app.get('/search', (req, res) => {
  const { item, limit } = req.query;
  res.json({ message: `Search for item: ${item || 'any'}, limit: ${limit || 10}` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
