import request from "supertest";
import { app } from "../../app";
import { prisma } from "../../prisma-client";

const makeRequest = () => request(app).post("/api/courses");

it("should only be accessible with a valid token", async () => {
  return request(app)
    .post("/api/courses")
    .set("authorization", "ashjdbahsd")
    .send()
    .expect(401);
});

it("should validate the body", async () => {
  const sendRequest = async (body: Object) => {
    return makeRequest()
      .set("authorization", global.getAuthHeader())
      .send(body)
      .expect(400);
  };

  await Promise.all([
    sendRequest({ categoryId: "test" }),
    sendRequest({ categoryId: "test", title: "test", description: "" }),
    sendRequest({ title: 98, category: "", price: "82" }),
    sendRequest({
      price: "jasnd",
      categoryId: "asdausd",
      description: "sadaasdad",
      title: "test",
    }),
  ]);
});

it("should throw an error if the category is not valid", async () => {
  const { body } = await makeRequest()
    .set("authorization", global.getAuthHeader())
    .send({
      price: 40,
      categoryId: "random_category",
      title: "Best course",
      description: "Some description",
    })
    .expect(400);

  expect(body.error.message).toContain("Category not valid");
});

it("should create a course and save it to the database", async () => {
  const category = await prisma.category.create({
    data: {
      name: "development",
      sub_categories: { create: { name: "web-development" } },
    },
    include: { sub_categories: true },
  });

  const course = {
    price: 40,
    categoryId: category.sub_categories[0].id,
    title: "Javascript",
    description: "Some description",
  };

  const { body } = await makeRequest()
    .set("authorization", global.getAuthHeader())
    .send(course)
    .expect(201);

  expect(body.title).toEqual(course.title);
  expect(body.description).toEqual(course.description);
  expect(body.price).toEqual(course.price);
});
