import request from "supertest";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import app, { server } from '../app.js';
import User from "../models/userModel.js";

type TestUser = {
  email: string;
  password: string;
  name: string;
};

// test users ------------------------------------------------------------
const testUser: TestUser = {
  email: "testing@testing.com",
  password: "test",
  name: "test123",
};

const emailAlreadyExists: TestUser = {
  email: "test@test.com",
  password: "test123",
  name: "test",
};

const nameTooLong: TestUser = {
  email: "test@test.com",
  password: "test123",
  name: "test123456 12345",
};
// ------------------------------------------------------------------------

describe("User API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI as string);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await new Promise((resolve) => server.close(resolve));

  });

  describe("Signup", () => {
    describe("Correct signup", () => {
      it("should signup a user", async () => {
        const response = await request(app).post("/api/signup").send(testUser);
        expect(response.status).toBe(201);

        // check if user is created in the database
        const user = await User.findOne({ email: testUser.email });
        expect(user).toBeDefined();
        expect(user?.email).toBe(testUser.email);
        expect(user?.name).toBe(testUser.name[0].toUpperCase() + testUser.name.slice(1).toLowerCase());
        expect(user?.password).toBeDefined();
        expect(user?.password).not.toBe(testUser.password);
        const isPasswordCorrect = await bcrypt.compare(testUser.password, user!.password);
        expect(isPasswordCorrect).toBe(true);

        await User.deleteOne({ email: testUser.email });
      });
    });
    describe("Email already exists", () => {
      it("should not signup a user with an email that already exists", async () => {
        const response = await request(app).post("/api/signup").send(emailAlreadyExists);
        expect(response.status).toBe(400);
      });
    });
  });
});
