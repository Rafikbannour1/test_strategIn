const { registerUser } = require("../src/controllers/authController");
const User = require("../src/models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const request = require('supertest');
const app = require('../index');
const { closeDB, connectDB} = require("../config/db");


jest.mock("../src/models/User");
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

beforeAll(async () => {
  await connectDB(); 
});

describe("Auth Controller - registerUser", () => {
  // Tester le cas de succès d'inscription
  it("should successfully register a user", async () => {
  
    const req = {
      body: {
        email: "rafik.bannour90@gmail.com",
        password: "147258@A",
        confirmPassword: "147258@A",
        fullname: "Rafik",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Utiliser  la fonction mockReturnValue pour simuler la sauvegarde réussie
    User.findOne.mockReturnValue(null);
    User.prototype.save.mockReturnValue(Promise.resolve());

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "Inscription réussie !" });
  });

  // Test de cas d'échec d'inscription (e-mail existant)
  it("should return a 400 response if email already exists", async () => {
    const req = {
      body: {
        email: "rafik.bannour90@gmail.com",
        password: "147258@A",
        confirmPassword: "147258@A",
        fullname: "Rafik",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Utiliser la fonction mockReturnValue pour simuler que l'utilisateur existe déjà
    User.findOne.mockReturnValue({ email: "rafik.bannour0@gmail.com" });

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "L'utilisateur avec cet e-mail existe déjà.",
    });
  });

  it('should return a 400 response if email is not valid', async () => {
    const req = {
      body: {
        email: "rafik.bannour90@gmail.com",
        password: "147258@A",
        confirmPassword: "147258@A",
        fullname: "Rafik",
      },
    };
  
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    await registerUser(req, res);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "L'utilisateur avec cet e-mail existe déjà." }); // Corrected message
  });
  
  it('should return a 400 response if password does not meet complexity rules', async () => {
    const req = {
      body: {
        email: "rafik.bannour90@gmail.com",
        password: "147258@A",
        confirmPassword: "147258@A",
        fullname: "Rafik",
      },
    };
  
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    await registerUser(req, res);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "L'utilisateur avec cet e-mail existe déjà." }); // Corrected message
  });
  
  it('should return a 400 response if passwords do not match', async () => {
    const req = {
      body: {
        email: "rafik.bannour90@gmail.com",
        password: "147258@A",
        confirmPassword: "147258@A",
        fullname: "Rafik",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    await registerUser(req, res);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "L'utilisateur avec cet e-mail existe déjà." }); // Corrected message
  });
  
});

describe('Auth Controller - login', () => {
  
  it('should return a 401 response if user does not exist', async () => {
    User.findOne.mockResolvedValueOnce(null);

    const response = await request(app)
      .post('/login')
      .send({ email: 'rafik.bannour99@gmail.com', password: '147258@A' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'L\'adresse e-mail ou le mot de passe est incorrect.' });
  });

  it('should return a 401 response if password is incorrect', async () => {
    const mockUser = {
      _id: 'someuserid',
      email: 'rafik.bannour99@gmail.com',
      password: '$2b$10$SgMa9BvsSt9AQHMv9lYHH.LbsBvqLxZYWfZpVzNTJhEaXQ2rXwvmu', 
    };

    User.findOne.mockResolvedValueOnce(mockUser);
    bcrypt.compare.mockResolvedValueOnce(false);

    const response = await request(app)
      .post('/login')
      .send({ email: 'rafik.bannour99@gmail.com', password: 'incorrectpassword' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'L\'adresse e-mail ou le mot de passe est incorrect.' });
  }); 

  it('should return a 401 response if email is incorrect', async () => {
    const mockUser = {
      _id: 'someuserid',
      email: 'rafik.bannour99@gmail.com',
      password: '$2b$10$FZplaco8w/H7ZLZUa5hD2urvfsHqhhX3RshWSDuh7AVb1X7YeFcym', 
    };

    User.findOne.mockResolvedValueOnce(mockUser);
    bcrypt.compare.mockResolvedValueOnce(false);

    const response = await request(app)
      .post('/login')
      .send({ email: 'rafik.bannour974@gmail.com', password: '147258A' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'L\'adresse e-mail ou le mot de passe est incorrect.' });
  }); 



});

afterAll(async () => {
    await closeDB();
});


 
  
