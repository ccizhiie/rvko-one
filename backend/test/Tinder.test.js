const { GetTinder, PostTinder } = require("../controllers/TinderController");
const { Login } = require("../controllers/UserController");
const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "..", "data.json");
const newDataPath = path.join(__dirname, "..", "newData.json");
describe("Tinder function", () => {
  let req2, res2, id, jsonData, jsonData2;
  let data = [];
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

  it("Get data to firebase", async () => {
    await Login(req2, res2);
    id = res2.json.mock.calls[0][0].id;
    const req = { params: { id: id } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await GetTinder(req, res);

    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0]).toHaveProperty("images");
    expect(res.json.mock.calls[0][0]).toHaveProperty("tinder");
    expect(res.json.mock.calls[0][0]).toHaveProperty("data");
    expect(res.json.mock.calls[0][0].images.imageUrl).not.toBeNull();
    expect(res.json.mock.calls[0][0].tinder).not.toBeNull();
    expect(res.json.mock.calls[0][0].data.path).not.toBeNull();
    expect(res.json.mock.calls[0][0].data.like).not.toBeNull();
    expect(res.json.mock.calls[0][0].data.dislike).not.toBeNull();
  },15000);

  it("Post data tinder to firebase", async () => {
    await Login(req2, res2);
    id = res2.json.mock.calls[0][0].id;
    const req3 = { params: { id: id } };
    const res3 = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await GetTinder(req3, res3);
    data = res3.json.mock.calls[0][0].data;
    const req = { params: { id: id }, body: { images: data } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await PostTinder(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json).toHaveBeenCalled();

    expect(res.json.mock.calls[0][0]).toHaveProperty("message");
    expect(res.json.mock.calls[0][0].message).toContain(
      "addend data successfully"
    );
  },15000);
});
