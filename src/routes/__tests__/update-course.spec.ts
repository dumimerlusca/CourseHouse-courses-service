import request from "supertest";
import { app } from "../../app";
import { prisma } from "../../prisma-client";
import { TestHelpers } from "../../test/helpers";

it("should be a private route", async () => {
  return request(app).patch("/api/courses/7272yyyasdyad").expect(401);
});

it("should throw 404 error if the course id is not valid", async () => {
  return request(app)
    .patch("/api/courses/7272yyyasdyad")
    .set("authorization", global.getAuthHeader())
    .expect(404);
});

it("should throw 401 error if the logged in user is not the course owner", async () => {
  const course = await TestHelpers.createCourse({ userId: "user1" });
  return request(app)
    .patch(`/api/courses/${course.id}`)
    .set("authorization", global.getAuthHeader("user2"))
    .expect(401);
});

it("shoudld properly update course description, title and price and return the updated course", async () => {
  const course = await TestHelpers.createCourse({ userId: "user1" });
  const data = {
    description: "Updated description",
    price: 666666,
    title: "Updated title",
  };
  const { body } = await request(app)
    .patch(`/api/courses/${course.id}`)
    .set("authorization", global.getAuthHeader(course.authorId))
    .send(data)
    .expect(200);

  expect(body.description).toEqual(data.description);
  expect(body.price).toEqual(data.price);
  expect(body.title).toEqual(data.title);

  const dbCourse = await prisma.course.findFirst({ where: { id: course.id } });

  expect(dbCourse?.description).toEqual(data.description);
  expect(dbCourse?.price).toEqual(data.price);
  expect(dbCourse?.title).toEqual(data.title);
});

it("should throw and error if user tries to update course category and it doesnt exist in db", async () => {
  const course = await TestHelpers.createCourse({ userId: "user1" });

  const { body } = await request(app)
    .patch(`/api/courses/${course.id}`)
    .set("authorization", global.getAuthHeader(course.authorId))
    .send({ categoryId: "72qbdyaybsdy" })
    .expect(500);

  expect(body.error.message).toContain(
    "Foreign key constraint failed on the field"
  );
});

it("should properly update course category", async () => {
  const course = await TestHelpers.createCourse({ userId: "user1" });

  const newSubCategory = await prisma.subCategory.create({
    data: { categoryId: course.category.categoryId, name: "test-category-123" },
  });

  const { body } = await request(app)
    .patch(`/api/courses/${course.id}`)
    .set("authorization", global.getAuthHeader(course.authorId))
    .send({ categoryId: newSubCategory.id })
    .expect(200);

  expect(body.category.id).toBe(newSubCategory.id);
});
