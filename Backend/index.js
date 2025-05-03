const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const router = require("./routes/orderRoutes");
const accessrouter = require("./routes/AccessRoutes");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const url = process.env.MONGO_URI;

app.use(
  cors({
    origin:
      process.env.NODE_ENV == "production"
        ? "http://localhost:3000"
        : "https://product-page-lqn6xqbdt-mayurs-projects-8fbc2ff1.vercel.app",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);
app.use("/access", accessrouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB(url);
  console.log(`Server running on port ${PORT}`);
});
