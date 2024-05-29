const {
  sendEmail,
  OTPcode,
  ChangePassword,
} = require("../controllers/ForgotPassword");
const axios = require("axios");

const { User } = require("../config/config");

describe("Forgot function", () => {
  let id, OTP, req2, res2;

  beforeEach(() => {
    req2 = {
      body: {
        emailforgot: "test@example.com",
      },
    };

    res2 = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("if email not found in database", async () => {
    req2.body.emailforgot = "wrongemail@gmail.com";
    await sendEmail(req2, res2);
    expect(res2.status).toHaveBeenCalledWith(404);
    expect(res2.status.mock.calls[0][0]).toBe(404);
    expect(res2.json).toHaveBeenCalled();
    expect(res2.json.mock.calls[0][0]).toHaveProperty("error");
    expect(res2.json.mock.calls[0][0].error).toContain("email not found");
  });
  it("send OTP", async () => {
    const email = req2.body.emailforgot;
    try {
      const response = await axios.post(
        "https://rvko-3-ip3erjcyk-maulanas-projects-3821647d.vercel.app/forgotpassword/email",
        { emailforgot: email }
      );

      expect(response.status).toBe(200);

      expect(response.data).toHaveProperty("message");
      expect(response.data.message).toContain("email sent successfully");

      id = response.data.uniqueId;
      expect(id).toBeDefined();
    } catch (error) {
      console.error("error:", error);
      throw error;
    }
  }, 15000);

  it("OTP saved in database", async () => {
    const email = "test@example.com";
    const snapshot = await User.where("email", "==", email).get();
    const doc = snapshot.docs[0]; 
    const data = doc.data(); 
    expect(doc.exists).toBe(true);
    expect(data.otp).not.toBeNull();
    OTP = data.otp;
  });

  it(" if OTP wrong ", async () => {
    req2 = {
      params: {
        uniqueId: id,
      },
      body: {
        otp: "PPPP",
      },
    };

   await OTPcode(req2, res2);
    expect(res2.status).toHaveBeenCalledWith(400);
    expect(res2.status.mock.calls[0][0]).toBe(400);
    expect(res2.json).toHaveBeenCalled();
    expect(res2.json.mock.calls[0][0]).toHaveProperty("error");
    expect(res2.json.mock.calls[0][0].error).toContain("code OTP wrong");
  });
  it(" if OTP true ", async () => {
    req2 = {
      params: {
        uniqueId: id,
      },
      body: {
        otp: OTP,
      },
    };

    res2 = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
   await OTPcode(req2, res2);
    expect(res2.status).toHaveBeenCalledWith(200);
    expect(res2.status.mock.calls[0][0]).toBe(200);
    expect(res2.json).toHaveBeenCalled();
    expect(res2.json.mock.calls[0][0]).toHaveProperty("message");
    expect(res2.json.mock.calls[0][0].message).toContain(
      "Data updated successfully"
    );
  });
  it(" if password no same ", async () => {
    const p1 = "palepale";
    const p2 = "siuuuuuu";
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
    expect(res2.status).toHaveBeenCalledWith(400);
    expect(res2.status.mock.calls[0][0]).toBe(400);
    expect(res2.json).toHaveBeenCalled();
    expect(res2.json.mock.calls[0][0]).toHaveProperty("error");
    expect(res2.json.mock.calls[0][0].error).toContain("password  no same");
  });
  it("password saved in data base", async () => {
    const p1 = "password";
    const p2 = "password";
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
  });
});
