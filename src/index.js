const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json

// Root route
app.get("/", (req, res) => {
  res.send("Hello from Render CI/CD!");
});

// Home route
app.get("/home", (req, res) => {
  res.send("This is the Home page");
});

// Dummy in-memory data
let users = [
  { id: 1, name: "Ravi", email: "ravi@example.com" },
  { id: 2, name: "Priya", email: "priya@example.com" },
];

let products = [
  { id: 1, name: "Phone", price: 15000 },
  { id: 2, name: "Laptop", price: 50000 },
];

// ==========================
// Users API
// ==========================
app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email are required" });
  }
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// ==========================
// Products API
// ==========================
app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

app.post("/api/products", (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: "Name and Price are required" });
  }
  const newProduct = { id: products.length + 1, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.delete("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  products = products.filter(p => p.id !== productId);
  res.status(200).json({ message: `Product with id ${productId} deleted.` });
});

// ==========================
// Health Check (for CI/CD testing)
// ==========================
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "API is healthy" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
