const { Register } = require("../controllers/UserController");
const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "..", "data.json");
// const newDataPath = path.join(__dirname, "..", "newData.json");

describe("Register function", () => {
  let req, res, jsonData;
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

  it("Register prosses is sucess and data save in database", async () => {
    // const data = {
    //   username: req.body.username,
    //   email: req.body.email,
    //   password: req.body.password,
    //   phone:"",
    //   password1: "",
    //   password2: "",
    // };

    // JSON.parse(fs.readFileSync(newDataPath));
    // fs.writeFileSync(newDataPath, JSON.stringify(data, null, 2));
    await Register(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json.mock.calls[0][0]).toHaveProperty("message");
    expect(res.json.mock.calls[0][0].message).toContain(
      "data added successfully"
    );
  });
});
