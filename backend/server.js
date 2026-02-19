require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const dashRoutes = require('./routes/dashboardRoutes');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const statusRoute = require("./routes/statusRoutes");
const userRoutes =require("./routes/userRoutes")
const errorHandler = require("./middleware/errorHandler");
const adminRoutes = require("./routes/adminRoutes");
const adminUserRoutes = require("./routes/adminUserRoutes");




const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
app.use(morgan('dev'));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(express.json());

const allowedOrigins = [
  "https://burmese-library-system.vercel.app/",
  "http://localhost:5173"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS Blocked"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());





const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100
});

app.use(limiter);

app.get('/', (req,res)=>{
  res.send('Library API Running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);
app.use('/api/dashboard', dashRoutes);
app.use("/api/status", statusRoute);
app.use("/api/users", userRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/admin", adminRoutes);
app.use("/api/admin/users", adminUserRoutes);


app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

app.use(errorHandler);
const startServer = async () => {
  try {
    await connectDB();   //  wait DB connection

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      // console.log(`Server running at http://localhost:${PORT}`);
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};
startServer();
