import express from "express";
import dotenv from "dotenv";
import connectDb from "./db.js";
import cors from 'cors';
// import 

dotenv.config();


const app = express();

const port = process.env.PORT;
app.use(cors());

app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
  })
);
// middlewares
app.use(express.json());

// app.use(cookieParser());
// app.get('/', function (req, res) {
//   res.send('Hello World');
// })

//  routes
import userRoutes from "./routes/userRoutes.js";
// import pinRoutes from "./routes/pinRoutes.js";

// routes
app.use("/api/user", userRoutes);
// app.use("/api/pin", pinRoutes);

app.get('/',)


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});