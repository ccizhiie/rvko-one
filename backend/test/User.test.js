const { Register , Login} = require('../controllers/UserController');
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '..','data.json');

describe('Register function', () => {
  let req,res,jsonData;
  beforeAll(()=>{
    const rawData = fs.readFileSync(dataPath);
    jsonData = JSON.parse(rawData);  

  })
    beforeEach(() => {
        req = {
          body: {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password'
          }
        };
    
        res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis()
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


    it('Register failed because email alredy used', async () => {
         req.body.email = 'coba@gmail.com';

          await Register(req, res);

          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.status.mock.calls[0][0]).toBe(400)
          expect(res.json).toHaveBeenCalled(); 
          expect(res.json.mock.calls[0][0]).toHaveProperty('error');
          expect(res.json.mock.calls[0][0].error).toContain('Email already used');
          
      });
      it('Register failed because username alredy used', async () => {
          req.body.username = 'coba';
       
          await Register(req, res);

          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.status.mock.calls[0][0]).toBe(400)
          expect(res.json).toHaveBeenCalled(); 
          expect(res.json.mock.calls[0][0]).toHaveProperty('error');
          expect(res.json.mock.calls[0][0].error).toContain('Username already used');
          
      });
     
  it('Register prosses is sucess and data save in database', async () => {
    const email = jsonData.email || 'test@example.com';
    const password = jsonData.password || 'password';
    const username = jsonData.username || 'testuser';
    req = {
      body: {
        username: username,
        email: email,
        password: password
      }
    };

      await Register(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200); 
      expect(res.status.mock.calls[0][0]).toBe(200)
      expect(res.json).toHaveBeenCalled();
      expect(res.json.mock.calls[0][0]).toHaveProperty("message");
      expect(res.json.mock.calls[0][0].message).toContain("data added successfully");
  });
 
});

describe('Login function', () => { 
  let req,res,jsonData;
  beforeAll(()=>{
    const rawData = fs.readFileSync(dataPath);
    jsonData = JSON.parse(rawData);  

  })
    beforeEach(() => {
        req = {
          body: {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password'
          }
        };
    
        res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis()
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

    it('login prosses with email password', async () => {
      const email = jsonData.email || 'test@example.com';
      const password = jsonData.password || 'password';
      const username = jsonData.password || 'testuser';
      req = {
        body: {
          username: username,
          email: email,
          password: password
        }
      };
    await Login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0]).toHaveProperty("message");
    expect(res.json.mock.calls[0][0].message).toContain("Authentication successful");
  });
  it('login prosses with username password', async () => {
    const email = jsonData.email || 'test@example.com';
    const password = jsonData.password || 'password';
    const username = jsonData.password || 'testuser';
    req = {
      body: {
        username: username,
        email: email,
        password: password
      }
    };
    await Login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status.mock.calls[0][0]).toBe(200)
    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0]).toHaveProperty("message");
    expect(res.json.mock.calls[0][0].message).toContain("Authentication successful");
  });
  it('login prosses if wrong password', async () => {
     req.body.password = 'coba';
      await Login(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.status.mock.calls[0][0]).toBe(401)
      expect(res.json).toHaveBeenCalled(); 
      expect(res.json.mock.calls[0][0]).toHaveProperty('error');
      expect(res.json.mock.calls[0][0].error).toContain('wrong');
  });});

  

