const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { del, User, Foto, bucket, time } = require("./config");
const multer = require("multer");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const session = require("express-session");
const app = express();

const memory = multer.memoryStorage();
const upload = multer({ storage: memory });

async function sendOTP(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 25,
    secure: false,
    auth: {
      user: "teamdua2222@gmail.com",
      pass: "mocvtlumyjpxowze",
    },
  });

  const mailOptions = {
    from: "teamdua2222@gmail.com",
    to: email,
    subject: "Kode OTP Anda",
    html: `<p style="text-align: center; font-size: 24px;">Kode OTP Anda adalah:</p>
    <p style="text-align: center; font-size: 36px; font-weight: bold;">${otp}</p>
    <p style="text-align: center; font-size: 16px;">Kode OTP akan kadaluarsa dalam 5 menit</p>
  `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Gagal mengirim email: ", error);
    } else {
      console.log("Email berhasil dikirim: ", info.response);
    }
  });
}

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
  const { email, username, password } = req.body;
  try {
    const emailExists = await User.where("email", "==", email).get();
    const usernameExists = await User.where("username", "==", username).get();

    if (!emailExists.empty) {
      return res.status(400).json({ error: "Email sudah digunakan." });
    }

    if (!usernameExists.empty) {
      return res.status(400).json({ error: "Username sudah digunakan." });
    }

    await User.add({ email, username, password });
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

app.post("/forgotpassword/email", async (req, res) => {
  const email = req.body.email;
  req.session.email = email;
  let otp = otpGenerator.generate(4, {
    upperCase: false,
    specialChars: false,
  });
  otp = otp.toUpperCase();
  const timestamp = time;
  try {
    const querySnapshot = await User.where("email", "==", email).get();
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];

      if (doc.exists) {
        await doc.ref.update({
          otp: otp,
          timestamp: timestamp,
        });
        await sendOTP(email, otp);
        return res.status(200).send("Data updated successfully." + otp);
      } else {
        res.status(404);
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Terjadi kesalahan dalam server." } + error);
  }
});

app.post("/forgotpassword/otp", async (req, res) => {
  const email = req.session.email;
  const otp = req.body.otp;
  const realtime = time.toDate();
  try {
    const querySnapshot = await User.where("email", "==", email).get();
    if (!querySnapshot.empty) {
      const realotp = querySnapshot.docs[0].data().otp;
      const timestroge = querySnapshot.docs[0].data().timestamp;
      const newtime = new Date(timestroge.toDate().getTime() + 5 * 60 * 1000);

      if (otp === realotp && newtime >= realtime) {
        const doc = querySnapshot.docs[0];
        await doc.ref.update({
          change: true,
          otp: del,
          timestamp: del,
        });
        return res.status(200).send("Data updated successfully.");
      } else {
        return res.status(200).send("code OTP salah atau telah kadaluarsa.");
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Terjadi kesalahan dalam server." } + error);
  }
});

app.post("/forgotpassword/password", async (req, res) => {
  const password = req.body.password;
  const email = req.session.email;
  console.log(email);
  try {
    const querySnapshot = await User.where("email", "==", email).get();
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const change = doc.data().change;
      if (change === true) {
        await doc.ref.update({
          change: false,
          password: password,
        });
        return res.status(200).send("Data updated successfully.");
      } else {
        return res.status(400).send("Change flag is not true.");
      }
    } else {
      return res.status(404).send("User not found.");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Terjadi kesalahan dalam server.", detail: error });
  }
});

app.get("/api/game/url", async (req, res) => {
  const directoryName = "foto/";
  const options = {
    prefix: directoryName,
  };

  bucket
    .getFiles(options)
    .then((files) => {
      const fileUrls = files[0].map((file) => {
        return file.getSignedUrl({
          action: "read",
          expires: "03-01-2500",
        });
      });
      Promise.all(fileUrls)
        .then((signedUrls) => {
          const imageUrls = signedUrls.map((url) => url[0]);
          res.json({ imageUrls });
        })
        .catch((error) => {
          console.error("Error getting signed URLs:", error);
          res.status(500).json({ error: "Failed to get image URLs." });
        });
    })
    .catch((error) => {
      console.error("Error getting files:", error);
      res.status(500).json({ error: "Failed to get files from directory." });
    });
});

// COBA COBA
// COBA COBA
// COBA COBA
app.post("/kirim", async (req, res) => {
  const { email } = req.body;
  let otp = otpGenerator.generate(4, {
    upperCase: false,
    specialChars: false,
  });
  sendOTP(email, otp);
  return res.json("Data updated successfully." + otp + email);
});
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const File = req.file;
    if (!File) {
      return res.status(400).send("No file uploaded.");
    }

    try {
      const fileRef = bucket.file("foto/" + File.originalname);
      await fileRef.save(File.buffer, {
        contentType: File.mimetype,
      });
      const fileData = {
        fileName: File.originalname,
        filePath: `foto/${File.originalname}`,
        like: 0,
        dislike: 0,
        contentType: File.mimetype,
      };
      await Foto.add(fileData);
      return res.status(200).send("File uploaded to Firebase Storage.");
    } catch (error) {
      return res.status(500).send("Error uploading file to Firebase Storage.");
    }
  } catch (error) {
    return res.status(500).json({ error: "Terjadi kesalahan dalam server." });
  }
});

app.listen(4000, () => console.log("Up & running *4000"));
