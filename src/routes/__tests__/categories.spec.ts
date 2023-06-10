import request from "supertest";
import { app } from "../../app";
import { prisma } from "../../prisma-client";

describe("categories", () => {
  it("should create a category and save it to the database", async () => {
    const res = await request(app)
      .post("/api/categories")
      .set("authorization", global.getAuthHeader())
      .send({ name: "development" })
      .expect(201);
  });

  it("it should return all categories", async () => {
    await prisma.category.create({ data: { name: "development" } });
    await prisma.category.create({ data: { name: "bussiness" } });

    const { body } = await request(app)
      .get("/api/categories")
      .set("authorization", global.getAuthHeader())
      .expect(200);

    expect(body.length).toBeGreaterThanOrEqual(2);
  });
});

describe("sub-categories", () => {
  it("should create a sub-category and save it to the database", () => {});

  it("it should return all sub-categories of a specific category", () => {});

  it("should be admin only routes", async () => {});
});
