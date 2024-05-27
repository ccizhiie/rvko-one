const { sendOTP } = require("./SendOTP.js");
const otpGenerator = require("otp-generator");
const { v4: uuidv4 } = require("uuid");
const { del, User } = require("../config/config.js");

exports.sendEmail = async (req, res) => {
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
};

exports.OTPcode = async (req, res) => {
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
};

exports.ChangePassword = async (req, res) => {
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
};
