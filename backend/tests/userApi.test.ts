import request from "supertest";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import app, { server } from "../app.js";
import User from "../models/userModel.js";

// test users
const testUser = {
  email: "testing@testing.com",
  password: "test1test",
  name: "test123",
};

const emailAlreadyExists = {
  email: "test@test.com",
  password: "test123",
  name: "test",
};

describe("User API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST as string);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await new Promise((resolve) => server.close(resolve));
  });

  describe("Signup", () => {
    describe("Correct signup", () => {
      it("should add user to db", async () => {
        const response = await request(app).post("/api/signup").send(testUser);
        expect(response.status).toBe(201);

        // check if user is created in the database
        const user = await User.findOne({ email: testUser.email });
        expect(user).toBeDefined();
        expect(user?.email).toBe(testUser.email);
        expect(user?.name).toBe(testUser.name[0]?.toUpperCase() + testUser.name.slice(1).toLowerCase());
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

    describe("Missing fields", () => {
      it("should not signup a user without a name", async () => {
        const response = await request(app).post("/api/signup").send({ email: testUser.email, password: testUser.password });
        expect(response.status).toBe(400);
      });
      it("should not signup a user without a password", async () => {
        const response = await request(app).post("/api/signup").send({ email: testUser.email, name: testUser.name });
        expect(response.status).toBe(400);
      });
    });
    describe("Password validation", () => {
      it("should not signup a user with a password less than 8 characters", async () => {
        const response = await request(app).post("/api/signup").send({ email: testUser.email, name: testUser.name, password: "short" });
        expect(response.status).toBe(400);
      });
      it("should not signup a user with only letters in the password", async () => {
        const response = await request(app).post("/api/signup").send({ email: testUser.email, name: testUser.name, password: "onlyletters" });
        expect(response.status).toBe(400);
      });
    });
  });

  describe("Login", () => {
    describe("Correct login", () => {
      it("should login user", async () => {
        const response = await request(app).post("/api/login").send({
          email: emailAlreadyExists.email,
          password: emailAlreadyExists.password,
        });
        expect(response.status).toBe(200);

        const user = await User.findOne({ email: emailAlreadyExists.email });
        expect(user).toBeDefined();
        expect(bcrypt.compare(emailAlreadyExists.password, user!.password)).toBeTruthy();
      });
    });

    describe("Email not found", () => {
      it("should not login user with an email that does not exist", async () => {
        const response = await request(app).post("/api/login").send({ email: testUser.email, password: testUser.password });
        expect(response.status).toBe(401);
      });
    });

    describe("Incorrect password", () => {
      it("should not login user with an incorrect password", async () => {
        const response = await request(app).post("/api/login").send({ email: emailAlreadyExists.email, password: "wrongpassword" });
        expect(response.status).toBe(401);
      });
    });

    describe("Missing fields", () => {
      it("should not login a user without a password", async () => {
        const response = await request(app).post("/api/login").send({ email: testUser.email });
        expect(response.status).toBe(401);
      });
    });
  });

  describe("Rate Limiting", () => {
    describe("Rate Limiting Behavior Verification", () => {
      it("should demonstrate login rate limiting works", async () => {
        const testIP = "192.168.1.100";
        const wrongLoginData = { email: emailAlreadyExists.email, password: "wrongpassword" };

        // Make multiple failed attempts to trigger rate limiting
        let rateLimited = false;
        let attemptCount = 0;

        for (let i = 0; i < 10; i++) {
          const response = await request(app)
            .post("/api/login")
            .set("X-Forwarded-For", testIP)
            .send(wrongLoginData);

          attemptCount++;

          if (response.status === 429) {
            rateLimited = true;
            expect(response.body.error).toBe("Too many login attempts, please try again after 15 minutes.");
            break;
          } else {
            expect(response.status).toBe(401);
          }
        }

        // Verify that rate limiting was triggered
        expect(rateLimited).toBe(true);
        expect(attemptCount).toBeLessThanOrEqual(6); // Should be rate limited by 6th attempt
      });

      it("should demonstrate signup rate limiting works", async () => {
        const testIP = "192.168.1.200";
        const validSignupData = { email: "test@test.com", password: "password123", name: "Test User" };

        let successfulSignups = 0;
        let rateLimited = false;

        // Try to make multiple successful signups
        for (let i = 0; i < 5; i++) {
          const response = await request(app)
            .post("/api/signup")
            .set("X-Forwarded-For", testIP)
            .send({ ...validSignupData, email: `test${i}@test.com` });

          if (response.status === 201) {
            successfulSignups++;
            // Clean up the user
            await User.deleteOne({ email: `test${i}@test.com` });
          } else if (response.status === 429) {
            rateLimited = true;
            expect(response.body.error).toBe("Too many signups from this IP, please try again after 1 hour.");
            break;
          }
        }

        // Verify that rate limiting was triggered (should happen after 1-2 successful signups)
        expect(rateLimited).toBe(true);
        expect(successfulSignups).toBeGreaterThanOrEqual(1);
        expect(successfulSignups).toBeLessThanOrEqual(2);
      });

      it("should demonstrate rate limiting is active and working", async () => {
        // This test verifies that rate limiting is working by showing that
        // requests are being rate limited, which proves the system is active

        const testIP = "192.168.1.300";
        const invalidSignupData = { email: "invalid", password: "short", name: "" };

        // Make several requests and verify we get rate limited responses
        let rateLimited = false;
        for (let i = 0; i < 10; i++) {
          const response = await request(app)
            .post("/api/signup")
            .set("X-Forwarded-For", testIP)
            .send(invalidSignupData);

          if (response.status === 429) {
            rateLimited = true;
            expect(response.body.error).toContain("Too many");
            break;
          }
        }

        // The fact that we get rate limited proves the rate limiting is working
        expect(rateLimited).toBe(true);
      });

      it("should demonstrate rate limiting is active", async () => {
        // This test verifies that rate limiting is working by showing that
        // requests are being rate limited, which proves the system is active

        const testIP = "192.168.1.400";
        const loginData = { email: emailAlreadyExists.email, password: emailAlreadyExists.password };

        // Make several requests and verify we get rate limited responses
        let rateLimited = false;
        for (let i = 0; i < 10; i++) {
          const response = await request(app)
            .post("/api/login")
            .set("X-Forwarded-For", testIP)
            .send(loginData);

          if (response.status === 429) {
            rateLimited = true;
            expect(response.body.error).toContain("Too many");
            break;
          }
        }

        // The fact that we get rate limited proves the rate limiting is working
        expect(rateLimited).toBe(true);
      });
    });

    describe("Rate Limit Headers", () => {
      it("should include rate limit headers in responses", async () => {
        const testIP = "192.168.1.500";
        const response = await request(app)
          .post("/api/login")
          .set("X-Forwarded-For", testIP)
          .send({ email: emailAlreadyExists.email, password: emailAlreadyExists.password });

        expect(response.headers).toHaveProperty("ratelimit-limit");
        expect(response.headers).toHaveProperty("ratelimit-remaining");
        expect(response.headers).toHaveProperty("ratelimit-reset");
      });
    });
  });
});
