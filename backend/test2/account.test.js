const { PostProfil } = require("../controllers/HomeController");
const { Login } = require("../controllers/UserController");
const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "..", "data.json");
const newDataPath = path.join(__dirname, "..", "newData.json");

describe("Home function", () => {
  let req2, res2;
  let jsonData, jsonData2;
  beforeAll(() => {
    const rawData = fs.readFileSync(dataPath);
    jsonData = JSON.parse(rawData);
    const rawData2 = fs.readFileSync(newDataPath);
    jsonData2 = JSON.parse(rawData2);
  });
  beforeEach(() => {
    req2 = {
      body: {
        email: jsonData2.email,
        password: jsonData2.password,
        username: jsonData2.username,
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

  it("post profil succes ", async () => {
    await Login(req2, res2);

    const id = res2.json.mock.calls[0][0].id;
    let { username, password, email, phone } = jsonData2;
    let req4 = {
      params: { id: id },
      body: {
        username: username,
        password: password,
        email: email,
        phone: phone,
      },
    };
    let res4 = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await PostProfil(req4, res4);

    expect(res4.status).toHaveBeenCalledWith(200);
    expect(res4.status.mock.calls[0][0]).toBe(200);
    expect(res4.json).toHaveBeenCalled();
  }, 15000);
});
