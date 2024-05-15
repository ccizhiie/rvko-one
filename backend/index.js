const express = require("express");
const { v4: uuidv4 } = require("uuid");
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
      subject: "Your OTP Code",
      html: `<p style="text-align: center; font-size: 24px;">Your OTP code:</p>
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
  const phone = "";
  try {
    const emailExists = await User.where("email", "==", email).get();
    const usernameExists = await User.where("username", "==", username).get();

    if (!emailExists.empty) {
      return res.status(400).json({ error: "Email already used." });
    }

    if (!usernameExists.empty) {
      return res.status(400).json({ error: "Username already used." });
    }

    await User.add({ email, username, password, phone });
    return res.status(200).json({ message: "data added successfully." });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error." });
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
      return res.status(404).json({ error: "data not found." });
    }
    if (password !== storedPassword) {
      return res.status(401).json({ error: "Password wrong." });
    }
    const ID = id;
    return res
      .status(200)
      .json({ message: "Authentication successful.", id: ID });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/home/:id", async (req, res) => {
  const id = req.params.id;
  let { tinder } = req.body;

  try {
    const docRef = User.doc(id);
    const data = await docRef.get();

    if (existingDoc.exists) {
      const open = data.data().tinder;

      if (open !== "close") {
        await docRef.update({ tinder: tinder });
        return res.status(200).json({ message: "Data added successfully" });
      } else {
        tinder = "close";
        await docRef.update({ tinder: tinder });
        return res.status(200).json({ message: "Data added successfully" });
      }
    } else {
      return res.status(404).json({ error: "Document not found." });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.get("/home/profil/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await User.doc(id).get();
    if (data.exists) {
      const userData = {
        username: data.data().username,
        password: data.data().password,
        email: data.data().email,
        phone: data.data().phone,
      };
      res.status(200).json(userData);
    } else {
      res.status(404).json({ error: "data not found." });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/home/profil/:id", async (req, res) => {
  const id = req.params.id;
  const newdata = req.body;
  try {
    await User.doc(id).set(newdata, { merge: true });
    return res.status(200).json({ message: "data sucefull updated" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/forgotpassword/email", async (req, res) => {
  const email = req.body.emailforgot;
  let otp = otpGenerator.generate(4, {
    upperCase: false,
    specialChars: false,
  });
  const uniqueId = uuidv4();
  otp = otp.toUpperCase();
  try {
    const querySnapshot = await User.where("email", "==", email).get();
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];

      if (doc.exists) {
        await doc.ref.update({
          otp: otp,
          uniqueId: uniqueId,
        });
        await sendOTP(email, otp);
        return res
          .status(200)
          .json({ message: "email sent successfully.", uniqueId: uniqueId });
      } else {
        return res.status(404).json({ error: "doc not found." });
      }
    } else {
      return res.status(404).json({ error: "email not found." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." } + error);
  }
});

app.post("/forgotpassword/otp/:uniqueId", async (req, res) => {
  const uniqueId = req.params.uniqueId;
  const { otp } = req.body;

  try {
    const querySnapshot = await User.where("uniqueId", "==", uniqueId).get();
    if (!querySnapshot.empty) {
      const realotp = querySnapshot.docs[0].data().otp;
      if (otp == realotp) {
        const doc = querySnapshot.docs[0];
        await doc.ref.update({
          change: true,
          otp: del,
        });
        return res
          .status(200)
          .json({ message: "Data updated successfully.", uniqueId: uniqueId });
      } else {
        return res.status(400).json({ error: "code OTP wrong." });
      }
    } else {
      return res.status(400).json({ error: "email  not found." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." } + error);
  }
});

app.post("/forgotpassword/password/:uniqueId", async (req, res) => {
  const { passforgot, passforgot2 } = req.body;
  const uniqueId = req.params.uniqueId;

  try {
    if (passforgot == passforgot2) {
      const querySnapshot = await User.where("uniqueId", "==", uniqueId).get();
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const change = doc.data().change;
        if (change == true) {
          await doc.ref.update({
            change: false,
            password: passforgot,
            uniqueId: del,
          });
          return res
            .status(200)
            .json({ message: "Data updated successfully." });
        } else {
          return res.status(400).json({ error: "cannot change password." });
        }
      } else {
        return res.status(404).json({ error: "user not found." });
      }
    } else {
      return res.status(400).json({ error: "password  no same." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error.", detail: error });
  }
});

app.post("/tinder/:id", async (req, res) => {
  const id = req.params.id;
  const { images } = req.body;
  console.log(images.length);
  try {
    for (let i = 0; i < images.length; i++) {
      const item = images[i];
      const { like, dislike, path } = item;
      console.log(like, dislike, path);
      const querySnapshot = await Foto.where("filePath", "==", path).get();
      const doc = querySnapshot.docs[0];

      if (!doc.empty) {
        let currentLike = doc.data().like;
        let currentDislike = doc.data().dislike;

        currentLike += like;
        currentDislike += dislike;

        await doc.ref.update({
          like: currentLike,
          dislike: currentDislike,
        });
      } else {
        return res
          .status(404)
          .json({ error: "cannot save data to the server" });
      }
    }

    return res.status(200).json({ massage: "addend data successfully" });
  } catch (error) {
    return res.status(500).send("Internal server error.");
  }
});

app.get("/api/tinder/:id", async (req, res) => {
  const directoryName = "foto/";
  const id = req.params.id;

  const options = {
    prefix: directoryName,
  };

  try {
    const querySnapshot = await User.doc(id).get();
    const tinder = querySnapshot.data().tinder;
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
    const data = [];
    for (const imageUrl of imageUrls) {
      const questionMarkIndex = imageUrl.indexOf("?");
      const urlBeforeQuestionMark = imageUrl.substring(0, questionMarkIndex);
      const splitUrl = urlBeforeQuestionMark.split("/");
      const dataAfterDomain = splitUrl.slice(4).join("/");

      imagesWithPath.push({
        imageUrl,
      });
      data.push({
        path: dataAfterDomain,
        like: 0,
        dislike: 0,
      });
    }
    return res.json({ images: imagesWithPath, tinder: tinder, data: data });
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
  // email = "maulanajapar92@gmail.com";
  const { email } = req.body;
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
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(4000, () => console.log("Up & running *4000"));
