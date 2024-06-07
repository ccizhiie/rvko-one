const { Register, Login } = require("../controllers/UserController");
const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "..", "data.json");
const newDataPath = path.join(__dirname, "..", "newData.json");

describe("Register function", () => {
  let req, res, jsonData;
  beforeAll(() => {
    const rawData = fs.readFileSync(dataPath);
    jsonData = JSON.parse(rawData);
  });
  beforeEach(() => {
    // const     email= jsonData.email || "test@example.com";
    //     const password = jsonData.password || "password";
    //   const username = jsonData.username || "testuser";
    req = {
      body: {
        email: jsonData.email || "test@example.com",
        password: jsonData.password || "password",
        username: jsonData.username || "testuser",
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

  it("Register failed because email alredy used", async () => {
    req.body.email = "coba@gmail.com";

    await Register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status.mock.calls[0][0]).toBe(400);
    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0]).toHaveProperty("error");
    expect(res.json.mock.calls[0][0].error).toContain("Email already used");
  });
  it("Register failed because username alredy used", async () => {
    req.body.username = "coba";

    await Register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status.mock.calls[0][0]).toBe(400);
    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0]).toHaveProperty("error");
    expect(res.json.mock.calls[0][0].error).toContain("Username already used");
  });

  it("Register prosses is sucess and data save in database", async () => {
    const data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      password1: "",
      password2: "",
    };

    JSON.parse(fs.readFileSync(newDataPath));
    fs.writeFileSync(newDataPath, JSON.stringify(data, null, 2));
    console.log(req);
    await Register(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0]).toHaveProperty("message");
    expect(res.json.mock.calls[0][0].message).toContain(
      "data added successfully"
    );
  });
});

describe("Login function", () => {
  let req, res, jsonData, jsonData2;
  beforeAll(() => {
    const rawData = fs.readFileSync(dataPath);
    jsonData = JSON.parse(rawData);

    const rawData2 = fs.readFileSync(newDataPath);
    jsonData2 = JSON.parse(rawData2);
  });
  beforeEach(() => {
    req = {
      body: {
        email: jsonData2.email || "test@example.com",
        password: jsonData2.password || "password",
        username: jsonData2.username || "testuser",
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

  it("login prosses with email password", async () => {
    const email = jsonData.email || jsonData2.email || "test@example.com";
    const password = jsonData.password || jsonData2.password || "password";
    const username = "wtestuser";
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
  it("login prosses with username password", async () => {
    const email = "wtest@example.com";
    const password = jsonData.password || jsonData2.password || "password";
    const username = jsonData.username || jsonData2.username || "testuser";
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
  it("login prosses if wrong password", async () => {
    const email = jsonData.email || jsonData2.email || "test@example.com";
    const password = "wpassword";
    const username = jsonData.username || jsonData2.username || "testuser";
    req = {
      body: {
        username: username,
        email: email,
        password: password,
      },
    };
    await Login(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.status.mock.calls[0][0]).toBe(401);
    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0]).toHaveProperty("error");
    expect(res.json.mock.calls[0][0].error).toContain("wrong");
  });
});
