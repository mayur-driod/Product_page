const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const router = require("./routes/orderRoutes");

require("dotenv").config();

const app = express();
const url = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB(url);
  console.log(`Server running on port ${PORT}`);
});
