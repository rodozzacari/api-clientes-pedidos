const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/users");
const orderRoutes = require("./routes/orders");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/orders", orderRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});