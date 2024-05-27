const { Register , Login} = require('../controllers/UserController');

describe('Register function', () => {
  it('Register prosses is sucess and data save in database', async () => {
    const req = {
      body: {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password'
      }
    };
    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Panggil fungsi Register dengan data yang disiapkan
    await Register(req, res);

    // Memeriksa apakah status respons adalah 200
    expect(res.status).toHaveBeenCalledWith(200);
  });
 
});

describe('Login function', () => { 
    it('login prosses with email password', async () => {
    const req = {
      body: {
        username: 'wrongusername',
        email: 'test@example.com',
        password: 'password'
      }
    };
    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Panggil fungsi Register dengan data yang disiapkan
    await Login(req, res);

    // Memeriksa apakah status respons adalah 200
    expect(res.status).toHaveBeenCalledWith(200);
  });
  it('login prosses with username password', async () => {
    const req = {
      body: {
        username: 'testuser',
        email: 'wrongemail',
        password: 'password'
      }
    };
    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Panggil fungsi Register dengan data yang disiapkan
    await Login(req, res);

    // Memeriksa apakah status respons adalah 200
    expect(res.status).toHaveBeenCalledWith(200);
  });
  it('login prosses if wrong password', async () => {
    const req = {
      body: {
        username: 'testuser',
        email: 'test@example.com',
        password: 'wrongpassword'
      }
    };
    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Panggil fungsi Register dengan data yang disiapkan
    await Login(req, res);

    // Memeriksa apakah status respons adalah 200
    expect(res.status).toHaveBeenCalledWith(401);
  });});

  

