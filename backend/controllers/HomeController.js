const { User } = require("../config/config.js");

exports.Home = async (req, res) => {
  const id = req.params.id;
  let { tinder } = req.body;

  try {
    const docRef = User.doc(id);
    const existingDoc = await docRef.get();

    if (existingDoc.exists) {
      const open = existingDoc.data().tinder;

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
};

exports.GetProfil = async (req, res) => {
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
};

exports.PostProfil = async (req, res) => {
  const id = req.params.id;
  const { username, email } = req.body;

  try {
    // Cek keunikan email
    const emailCheck = await User.where("email", "==", email).get();
    if (!emailCheck.empty && emailCheck.docs.some((doc) => doc.id !== id)) {
      return res.status(400).json({ error: "Email alredy used" });
    }

    // Cek keunikan username
    const usernameCheck = await User.where("username", "==", username).get();
    if (
      !usernameCheck.empty &&
      usernameCheck.docs.some((doc) => doc.id !== id)
    ) {
      return res.status(400).json({ error: "Username alredy used" });
    }

    // Update dokumen user
    await User.doc(id).set(req.body, { merge: true });
    return res.status(200).json({ message: "update sucessfully." });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Kesalahan server internal." });
  }
};
