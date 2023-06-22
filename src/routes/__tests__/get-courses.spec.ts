import request from "supertest";
import { app } from "../../app";
import { TestHelpers } from "../../test/helpers";

it("should require authentication", async () => {
  return request(app).get("/api/courses").expect(401);
});

it("should return the courses created by the logged in user", async () => {
  const userId = "176242nuasudabd";
  const bearerToken = global.getAuthHeader(userId);

  await TestHelpers.createCourse({ userId });

  const { body } = await request(app)
    .get("/api/courses")
    .set("authorization", bearerToken)
    .expect(200);

  expect(body.length).toBeGreaterThanOrEqual(1);

  const course = body[0];
  expect(course.authorId).toEqual(userId);
  expect(course.category.id).not.toBeNull();
});
