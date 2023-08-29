import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userRouter from "./routes/user.js";
import mhsRouter from "./routes/mahasiswa.js";
import obatRouter from "./routes/obat.js";
import asRouter from "./routes/asrama.js";
import konRoter from "./routes/kondisiMahasiswa.js";
import lapRouter from "./routes/laporan.js";

dotenv.config({ path: ".env-local" });
const port = process.env.PORT;
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MIDDLEWARE
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(402).send("Token tidak ada!");
  jwt.verify(token.split(" ")[1], process.env.TOKEN, async (err, _decoded) => {
    if (!err) {
      next();
    } else {
      return res.status(401).send("Autentikasi tidak sesuai/expired");
    }
  });
};

app.use("/api/user", userRouter);
app.use(auth)
app.use("/api/mahasiswa", mhsRouter);
app.use("/api/obat", obatRouter);
app.use("/api/asrama", asRouter);
app.use("/api/kondisiMahasiswa", konRoter);
app.use("/api/laporan", lapRouter);

app.listen(port, () => console.log(`Berjalan pada port ${port}`));
