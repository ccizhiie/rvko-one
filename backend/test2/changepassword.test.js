const { OTPcode, ChangePassword } = require("../controllers/ForgotPassword");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "..", "data.json");
const newDataPath = path.join(__dirname, "..", "newData.json");

const { User } = require("../config/config");

describe("Forgot function", () => {
  let id, OTP, req2, res2, jsonData, jsonData2;
  beforeAll(() => {
    const rawData = fs.readFileSync(dataPath);
    jsonData = JSON.parse(rawData);
    const rawData2 = fs.readFileSync(newDataPath);
    jsonData2 = JSON.parse(rawData2);
  });

  beforeEach(() => {
    req2 = {
      body: {
        emailforgot: jsonData2.email,
      },
    };

    res2 = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  afterAll(() => {
    const resetData = {};
    for (const key in jsonData) {
      if (jsonData.hasOwnProperty(key)) {
        resetData[key] = "";
      }
    }
    fs.writeFileSync(dataPath, JSON.stringify(resetData, null, 2));
  });

  const data = async () => {
    const email = req2.body.emailforgot;
    const snapshot = await User.where("email", "==", email).get();
    const doc = snapshot.docs[0];
    const data = doc.data();
    OTP = data.otp;
    id = data.uniqueId;
  };

  const send = async () => {
    const email = jsonData2.email;
    try {
      const response = await axios.post(
        "https://rvko-3-ip3erjcyk-maulanas-projects-3821647d.vercel.app/forgotpassword/email",
        { emailforgot: email }
      );

      expect(response.status).toBe(200);

      expect(response.data).toHaveProperty("message");
      expect(response.data.message).toContain("email sent successfully");
    } catch (error) {
      throw error;
    }
  };

  it("password saved in data base", async () => {
    await send();
    await data();
    let req = {
      params: {
        uniqueId: id,
      },
      body: {
        otp: OTP,
      },
    };
    let res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await OTPcode(req, res);

    const p1 = jsonData.password1;
    const p2 = jsonData.password2;
    req2 = {
      params: {
        uniqueId: id,
      },
      body: {
        passforgot: p1,
        passforgot2: p2,
      },
    };

    res2 = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await ChangePassword(req2, res2);
    expect(res2.status).toHaveBeenCalledWith(200);

    expect(res2.status.mock.calls[0][0]).toBe(200);
    expect(res2.json).toHaveBeenCalled();
    expect(res2.json.mock.calls[0][0]).toHaveProperty("message");
    expect(res2.json.mock.calls[0][0].message).toContain(
      "Data updated successfully"
    );
  }, 20000);
});
