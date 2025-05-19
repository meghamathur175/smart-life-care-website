const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const partnerRoutes = require("./routes/partnerRoutes"); 
const connectDb = require("./config/database");

dotenv.config(); // Load environment variables

const app = express();
connectDb(); // Connect to MongoDB

app.use(express.json()); // Parse JSON bodies

// CORS configuration to allow frontend access
app.use(
  cors({
    origin: process.env.FRONTEND_URI, 
    credentials: true,
  })
);

// API Routes
app.use("/api/Users", userRoutes);
app.use("/api/Partners", partnerRoutes); 

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
