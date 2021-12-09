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
              id: expect.any(Number),
              name: expect.any(String),
              completed: expect.any(Boolean),
            }),
          ])
        );
      });
  });

  it("GET /todos/id -> a single TODO by ID of 1", () => {
    return request(app)
      .get("/todos/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            completed: expect.any(Boolean),
          })
        );
      });
  });

  it("GET /todos/id -> 404 if not found", () => {
    return request(app).get("/todos/9999").expect(404);
  });

  it("POST /todos -> create new todo", () => {
    return request(app)
      .post("/todos")
      .send({
        name: "clean room",
        completed: false,
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            name: "clean room",
            completed: false,
          })
        );
      });
  });

  it("POST /todos -> validates request body", () => {
    return request(app)
      .post("/todos")
      .send({
        name: 123,
      })
      .expect(422);
  });
});
