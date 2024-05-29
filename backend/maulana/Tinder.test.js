const {
    GetTinder,
    PostTinder,
  } = require("../controllers/TinderController");
  const { Login } = require("../controllers/UserController");
  
  describe("Tinder function", () => {
    let req2, res2,id;
    let data = [];
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
  
    it("Get data to firebase", async () => {
      await Login(req2, res2);
       id = res2.json.mock.calls[0][0].id;
      const req = { params: { id: id }};
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
      data = res.json.mock.calls[0][0].data

    });
  
    it("Post data tinder to firebase", async () => {
      const req = { params: { id: id },body:{images:data} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
  
      await PostTinder(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.status.mock.calls[0][0]).toBe(200)
      expect(res.json).toHaveBeenCalled();
  
      expect(res.json.mock.calls[0][0]).toHaveProperty("message");
      expect(res.json.mock.calls[0][0].message).toContain("addend data successfully");
    });
  
  
  });
  