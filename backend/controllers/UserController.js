const { User } = require("../config/config.js");

exports.Register = async (req, res) => {
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
};

exports.Login = async (req, res) => {
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
};
