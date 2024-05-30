const {
  Home,
  GetProfil,
  PostProfil,
} = require("../controllers/HomeController");
const { Login } = require("../controllers/UserController");

describe("Home function", () => {
  let req2, res2;
  let data;
  beforeEach(() => {
    req2 = {
      body: {
        username: "testuser",
        email: "test@example.com",
        password: "password",
      },
    };

    res2 = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("if document not found in database to open tinder", async () => {
    await Login(req2, res2);
    const req = { params: { id: `hvghvghv` }, body: { tinder: "open" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await Home(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.status.mock.calls[0][0]).toBe(404)
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
    expect(res.status.mock.calls[0][0]).toBe(200)
    expect(res.json).toHaveBeenCalled();

    const response = res.json.mock.calls[0][0];
    data = response;

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
    expect(res.status.mock.calls[0][0]).toBe(404)

    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0]).toHaveProperty("error");
    expect(res.json.mock.calls[0][0].error).toContain("data not found");
  });

  it("post profil data to firebase if email alredy used", async () => {
    await Login(req2, res2);
    let { username, email, phone, password } = data;
    email = "coba@gmail.com";
    const id = res2.json.mock.calls[0][0].id;
    const req = {
      params: { id: id },
      body: {
        username: username,
        email: email,
        password: password,
        phone: phone,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await PostProfil(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status.mock.calls[0][0]).toBe(400)

    expect(res.json).toHaveBeenCalled();

    expect(res.json.mock.calls[0][0]).toHaveProperty("error");
    expect(res.json.mock.calls[0][0].error).toContain("Email alredy used");
  });

  it("post profil data to firebase if username alredy used", async () => {
    await Login(req2, res2);
    let { username, email, phone, password } = data;
    username = "coba";
    const id = res2.json.mock.calls[0][0].id;
    const req = {
      params: { id: id },
      body: {
        username: username,
        email: email,
        password: password,
        phone: phone,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await PostProfil(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status.mock.calls[0][0]).toBe(400)
    expect(res.json).toHaveBeenCalled();

    expect(res.json.mock.calls[0][0]).toHaveProperty("error");
    expect(res.json.mock.calls[0][0].error).toContain("Username alredy used");
  });

  it("post profil data saved to firebase ", async () => {
    await Login(req2, res2);
    let { username, email, phone, password } = data;
    phone = "123";
    const id = res2.json.mock.calls[0][0].id;
    const req = {
      params: { id: id },
      body: {
        username: username,
        email: email,
        password: password,
        phone: phone,
      },
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await PostProfil(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status.mock.calls[0][0]).toBe(200)
    expect(res.json).toHaveBeenCalled();
  });
});
