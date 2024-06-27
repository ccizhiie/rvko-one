const { Login } = require("../controllers/UserController");
const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "..", "data.json");

describe("Login function", () => {
  let req, res, jsonData, jsonData2;
  beforeAll(() => {
    const rawData = fs.readFileSync(dataPath);
    jsonData = JSON.parse(rawData);
  });
  beforeEach(() => {
    req = {
      body: {
        email: jsonData.email,
        password: jsonData.password,
        username: jsonData.username,
      },
    };

    res = {
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

  it("login prosses success", async () => {
    const email = jsonData.email;
    const password = jsonData.password;
    const username = jsonData.username;
    req = {
      body: {
        username: username,
        email: email,
        password: password,
      },
    };
    await Login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0]).toHaveProperty("message");
    expect(res.json.mock.calls[0][0].message).toContain(
      "Authentication successful"
    );
  });
});
