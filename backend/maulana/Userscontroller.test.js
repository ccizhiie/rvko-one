const { Register , Login} = require('../controllers/UserController');

describe('Register function', () => {
  let req,res;
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
      await Register(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200); 
      expect(res.status.mock.calls[0][0]).toBe(200)
      expect(res.json).toHaveBeenCalled();
      expect(res.json.mock.calls[0][0]).toHaveProperty("message");
      expect(res.json.mock.calls[0][0].error).toContain("data added successfully");
  });
 
});

describe('Login function', () => { 
  let req,res;
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
    it('login prosses with email password', async () => {
    await Login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0]).toHaveProperty("message");
    expect(res.json.mock.calls[0][0].error).toContain("Authentication successful");
  });
  it('login prosses with username password', async () => {
   
    await Login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status.mock.calls[0][0]).toBe(200)
    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0]).toHaveProperty("message");
    expect(res.json.mock.calls[0][0].error).toContain("Authentication successful");
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

  

