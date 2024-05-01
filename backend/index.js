const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./config");
const session = require("express-session");
const app = express();

app.use(
  session({
    secret: "rT6x#7$Gv9zPq2*wAe5L",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.json());
app.use(cors());

app.post("/");

app.post("/register", async (req, res) => {
  const data = req.body;
  try {
    await User.add(data);
    res.send({ msg: "User Added" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Terjadi kesalahan dalam server." });
  }
});

app.post("/login", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userSnapshotByEmail = await User.where("email", "==", email).get();
    const userSnapshotByUsername = await User.where(
      "username",
      "==",
      username
    ).get();
    let storedPassword;
    let id;
    if (!userSnapshotByEmail.empty) {
      const userData = userSnapshotByEmail.docs[0].data();
      storedPassword = userData.password;
      id = userSnapshotByEmail.docs[0].id;
    } else if (!userSnapshotByUsername.empty) {
      const userData = userSnapshotByUsername.docs[0].data();
      id = userSnapshotByUsername.docs[0].id;
      storedPassword = userData.password;
    } else {
      return res.status(404).json({ error: "Pengguna tidak ditemukan." });
    }
    if (password !== storedPassword) {
      return res.status(401).json({ error: "Password salah." });
    }
    req.session.userId = id;
    return res.status(200).json({ message: "Autentikasi berhasil." });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Terjadi kesalahan dalam server." });
  }
});

app.get("/home/profil", async (req, res) => {
  const id = req.session.userId;
  try {
    const data = await User.doc(id).get();
    if (data.exists) {
      const userData = data.data();
      res.json(userData);
    } else {
      res.status(404).json({ error: "Dokumen tidak ditemukan." });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Terjadi kesalahan dalam server." });
  }
});

app.post("/home/profil", async (req, res) => {
  const id = req.session.userId;
  const newdata = req.body;
  try {
    await User.doc(id).set(newdata, { merge: true });
    return res.send({ message: "data sucefull updated" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Terjadi kesalahan dalam server." });
  }
});

app.listen(4000, () => console.log("Up & running *4000"));
