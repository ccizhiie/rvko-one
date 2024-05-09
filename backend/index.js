const express = require("express");
require("dotenv").config();
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
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      debug: true,
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
     
    `,
    };

    const info = await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Gagal mengirim email: ", error);
          reject(error);
        } else {
          console.log("Email berhasil dikirim: ", info.response);
          resolve(info);
        }
      });
    });

    return info;
  } catch (error) {
    console.log("Gagal mengirim email: ", error);
    throw error;
  }
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

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
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
    return res.status(200).json({ message: "Data berhasil di tambahkan." });
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
    const ID = id;
    return res.status(200).json({ message: "Autentikasi berhasil.", id: ID });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Terjadi kesalahan dalam server." });
  }
});

app.get("/home/profil/:id", async (req, res) => {
  const id = req.params.id;
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

app.post("/home/profil/:id", async (req, res) => {
  const id = req.params.id;
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
  const { email } = req.body;
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
        return res
          .status(200)
          .json({ message: "Data updated successfully.", email });
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

app.post("/forgotpassword/otp/:email", async (req, res) => {
  const email = req.params.email;
  const otp = req.body.otp;
  // const realtime = time.toDate();
  try {
    const querySnapshot = await User.where("email", "==", email).get();
    if (!querySnapshot.empty) {
      const realotp = querySnapshot.docs[0].data().otp;
      const timestroge = querySnapshot.docs[0].data().timestamp;
      // const newtime = new Date(timestroge.toDate().getTime() + 5 * 60 * 1000);
      // console.log(email, otp, realotp, realtime, newtime);

      if (otp == realotp) {
        const doc = querySnapshot.docs[0];
        await doc.ref.update({
          change: true,
          otp: del,
          timestamp: del,
        });
        return res
          .status(200)
          .json({ msg: "Data updated successfully.", email });
      } else {
        return res
          .status(400)
          .json({ error: "code OTP salah atau telah kadaluarsa." });
      }
    } else {
      return res.status(400).json({ error: "email tidak ada." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Terjadi kesalahan dalam server." } + error);
  }
});

app.post("/forgotpassword/password/:email", async (req, res) => {
  const password = req.body.password;
  const email = req.params.email;
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

app.post("/api/game/likedislike", async (req, res) => {
  const { path, like, dislike } = req.body;
  const querySnapshot = await Foto.where("filePath", "==", path).get();
  const doc = querySnapshot.docs[0];
  if (!doc.empty) {
    await doc.ref.update({
      like: like,
      dislike: dislike,
    });

    return res.status(200).send("Data updated successfully.");
  }
});

app.get("/api/game/url", async (req, res) => {
  const directoryName = "foto/";
  const options = {
    prefix: directoryName,
  };

  try {
    const [files] = await bucket.getFiles(options);
    const fileUrls = files.map((file) => {
      return file.getSignedUrl({
        action: "read",
        expires: "03-01-2500",
      });
    });

    const signedUrls = await Promise.all(fileUrls);
    const imageUrls = signedUrls.map((url) => url[0]);

    const imagesWithPath = [];
    for (const imageUrl of imageUrls) {
      const questionMarkIndex = imageUrl.indexOf("?");
      const urlBeforeQuestionMark = imageUrl.substring(0, questionMarkIndex);
      const splitUrl = urlBeforeQuestionMark.split("/");
      const dataAfterDomain = splitUrl.slice(4).join("/");

      const querySnapshot = await Foto.where(
        "filePath",
        "==",
        dataAfterDomain
      ).get();
      const doc = querySnapshot.docs[0];
      const { like, dislike } = doc.data();

      imagesWithPath.push({
        imageUrl,
        path: dataAfterDomain,
        like: like,
        dislike: dislike,
      });
    }

    return res.json({ images: imagesWithPath });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch image URLs.", details: error.message });
  }
});

// COBA COBA
// COBA COBA
// COBA COBA
app.get("/kirim", async (req, res) => {
  email = "maulanajapar92@gmail.com";
  // const { email } = req.body;
  let otp = otpGenerator.generate(4, {
    upperCase: true,
    specialChars: false,
  });
  await sendOTP(email, otp);
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
      return res.status(200).json({ p: "File uploaded to Firebase Storage." });
    } catch (error) {
      return res
        .status(500)
        .json({ p: "Error uploading file to Firebase Storage.", e: error });
    }
  } catch (error) {
    return res.status(500).json({ error: "Terjadi kesalahan dalam server." });
  }
});

app.listen(4000, () => console.log("Up & running *4000"));
