const {
  Home,
  GetProfil,
  PostProfil,
} = require("../controllers/HomeController");
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
        email: jsonData2.email || "test@example.com",
        password: jsonData2.password || "password",
        username: jsonData2.username || "testuser",
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

  it("if document not found in database to open tinder", async () => {
    const req = { params: { id: `hvghvghv` }, body: { tinder: "open" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await Home(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.status.mock.calls[0][0]).toBe(404);
    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0]).toHaveProperty("error");
    expect(res.json.mock.calls[0][0].error).toContain("Document not found");
  });

  it("get profil data from firebase", async () => {
    await Login(req2, res2);

    const id = res2.json.mock.calls[0][0].id;
    const req = { params: { id: id } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await GetProfil(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json).toHaveBeenCalled();
    const response = res.json.mock.calls[0][0];
    expect(response).toHaveProperty("username");
    expect(response.username).not.toBeNull();
    expect(response.phone).not.toBeUndefined();

    expect(response).toHaveProperty("email");
    expect(response.email).not.toBeNull();
    expect(response.phone).not.toBeUndefined();

    expect(response).toHaveProperty("phone");
    expect(response.phone).not.toBeUndefined();

    expect(response).toHaveProperty("password");
    expect(response.password).not.toBeNull();
    expect(response.phone).not.toBeUndefined();
  });

  it("get profil data from firebase if data not found", async () => {
    await Login(req2, res2);
    const req = { params: { id: "knnjnhbh" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await GetProfil(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.status.mock.calls[0][0]).toBe(404);

    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0]).toHaveProperty("error");
    expect(res.json.mock.calls[0][0].error).toContain("data not found");
  });

  it("post profil data to firebase if email alredy used", async () => {
    await Login(req2, res2);

    const id = res2.json.mock.calls[0][0].id;

    let req3 = {
      params: { id: id }
    };
    let res3 = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await GetProfil(req3, res3);
    const response = res3.json.mock.calls[0][0];
    console.log(response)
    const data = response;
    const { username, phone, password } = data;
    let req4 = {
      params: { id: id },
      body:{
        username:username,
        password:password,
        email:"coba@gmail.com",
        phone:phone
      }
    };
    let res4 = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await PostProfil(req4, res4);

    expect(res4.status).toHaveBeenCalledWith(400);
    expect(res4.status.mock.calls[0][0]).toBe(400);

    expect(res4.json).toHaveBeenCalled();

    expect(res4.json.mock.calls[0][0]).toHaveProperty("error");
    expect(res4.json.mock.calls[0][0].error).toContain("Email alredy used");
  },15000);

  it("post profil data to firebase if username alredy used", async () => {
    await Login(req2, res2);

    const id = res2.json.mock.calls[0][0].id;

    let req3 = {
      params: { id: id }
    };
    let res3 = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await GetProfil(req3, res3);
    const response = res3.json.mock.calls[0][0];
    console.log(response)
    const data = response;
    const { email, phone, password } = data;
    let req4 = {
      params: { id: id },
      body:{
        username:"coba",
        password:password,
        email:email,
        phone:phone
      }
    };
    let res4 = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await PostProfil(req4, res4);

    expect(res4.status).toHaveBeenCalledWith(400);
    expect(res4.status.mock.calls[0][0]).toBe(400);
    expect(res4.json).toHaveBeenCalled();

    expect(res4.json.mock.calls[0][0]).toHaveProperty("error");
    expect(res4.json.mock.calls[0][0].error).toContain("Username alredy used");
  },15000);

  it("post profil data saved to firebase ", async () => {
    await Login(req2, res2);

    const id = res2.json.mock.calls[0][0].id;

    let req3 = {
      params: { id: id }
    };
    let res3 = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await GetProfil(req3, res3);
    const response = res3.json.mock.calls[0][0];
    console.log(response)
    const data = response;
    const { username,email, password } = data;
    let req4 = {
      params: { id: id },
      body:{
        username:username,
        password:password,
        email:email,
        phone:"123"
      }
    };
    let res4 = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await PostProfil(req4, res4);

    expect(res4.status).toHaveBeenCalledWith(200);
    expect(res4.status.mock.calls[0][0]).toBe(200);
    expect(res4.json).toHaveBeenCalled();
  },15000);
});
