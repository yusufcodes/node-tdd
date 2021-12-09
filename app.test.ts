const request = require("supertest");
const app = require("./app");

describe("TODOs API", () => {
  it("GET /todos -> array of TODOs", () => {
    return request(app)
      .get("/todos")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              completed: expect.any(Boolean),
            }),
          ])
        );
      });
  });

  it("GET /todos/id -> a single TODO by ID", () => {});

  it("GET /todos/id -> 404 if not found", () => {});

  it("POST /todos -> create new todo", () => {});

  it("POST /todos -> create new todo", () => {});
});
