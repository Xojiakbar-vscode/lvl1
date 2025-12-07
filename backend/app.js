const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize } = require("./models");
const adminRoute = require("./routes/adminRoute")
const setupSwagger = require("./swagger/swagger");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api", adminRoute);

setupSwagger(app);

sequelize
    .sync()
    .then(() => {
        console.log("Bazaga Ulandi ");
        app.listen(PORT, () => {
            console.log(`Server ishlayotgan manzil http://localhost:${PORT}`);
        });
    })
    .catch((err) => console.error("Baza xatosi:", err));