import express from "express";
import dotenv from "dotenv";
import connectDb from "./db.js";
import cors from 'cors';
import cookieParser from "cookie-parser"; 

dotenv.config();
//export const maxDuration = 50;

const app = express();

const port = process.env.PORT;
// app.use(cors());

app.use(
  cors({
    origin: process.env.Frontend, // Your frontend URL
    credentials: true, // ✅ Required for cookies
  })
);



// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.get('/', function (req, res) {
  res.send('Hello World')
});


//  routes
import userRoutes from "./routes/userRoutes.js";


// routes
app.use("/api/user", userRoutes);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});
