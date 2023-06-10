import request from "supertest";
import { app } from "../../app";
import { TestHelpers } from "../../test/helpers";

it("should be private", async () => {
  return request(app).post("/api/courses/1/lessons").expect(401);
});

it("should throw 401 error if the logged in user is not the course owner", async () => {
  const course = await TestHelpers.createCourse({ userId: "user1" });
  return request(app)
    .post(`/api/courses/${course.id}/lessons`)
    .set("authorization", global.getAuthHeader("user2"))
    .expect(401);
});
it("should throw 404 error if the course does not exist", async () => {
  return request(app)
    .post(`/api/courses/1/lessons`)
    .set("authorization", global.getAuthHeader("user2"))
    .expect(404);
});
