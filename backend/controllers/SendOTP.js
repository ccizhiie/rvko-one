const nodemailer = require("nodemailer");

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

module.exports = { sendOTP };
