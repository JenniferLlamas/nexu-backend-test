const mongoose = require("mongoose");
const { api, server } = require("./api");

describe("GET /brands", () => {
  test("should respond with a 200 status code and be an Array", async () => {
    const response = await api.get("/brands").send();
    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
describe("POST /brands", () => {
  test("should respond with an 400 status code and message error", async () => {
    const response = await api.post("/brands").send({ name: "Toyota" });
    const message = JSON.parse(response.text); 
    expect(response.status).toEqual(400);
    expect(message).toEqual("The name Toyota already exists");
   
  });
});


describe("GET /models", () => {
  test("should respond with a 200 status code and be an Array", async () => {
    const response = await api.get("/models").send();
    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("GET /models  filter", () => {
  test("should respond with an Array of models", async () => {
    const response = await api
      .get("/models")
      .send("greater=380000&lower=400000");
    expect(response.body).toBeInstanceOf(Array);
  });
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
