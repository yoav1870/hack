const app = require("../server");
const { ServerError } = require("../errors/errors");
const { petRepository } = require("../repository/pet.repository");
const request = require("supertest");
const { describe } = require("node:test");
jest.mock("../repository/pet.repository");

describe("GET /api/pet", () => {
  it("should return 200 and all pets", async () => {
    const mockPets = [
      {
        id: "1",
        name: "Max",
        age: 5,
        type: "dog",
        status: "available",
      },
      {
        id: "2",
        name: "Tom",
        age: 2,
        type: "cat",
        status: "available",
      },
    ];
    petRepository.find.mockResolvedValue(mockPets);
    const response = await request(app).get("/api/pet");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPets);
  });
  it("should return 404 and No data found", async () => {
    petRepository.find.mockResolvedValue([]);
    const response = await request(app).get("/api/pet");
    expect(response.status).toBe(404);
    expect(response.text).toBe('"No data found"');
  });
  it("should return status 500 when the server encountered an unexpected condition that prevented it from fulfilling the request.", async () => {
    petRepository.find.mockRejectedValue(new ServerError());
    const response = await request(app).get("/api/pet");
    expect(response.status).toBe(500);
    expect(response.text).toBe(
      '"server encountered an unexpected condition that prevented it from fulfilling the request."'
    );
  });
});
describe("GET /api/pet/:id", () => {
  it("should return 200 and the pet", async () => {
    const mockPets = [
      {
        id: "1",
        name: "Max",
        age: 5,
        type: "dog",
        status: "available",
      },
      {
        id: "2",
        name: "Tom",
        age: 2,
        type: "cat",
        status: "available",
      },
    ];
    petRepository.retrieve.mockResolvedValue(mockPets);
    const response = await request(app).get("/api/pet/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPets);
  });
  it("should return status 500 when the server encountered an unexpected condition that prevented it from fulfilling the request.", async () => {
    petRepository.retrieve.mockRejectedValue(new ServerError());
    const response = await request(app).get("/api/pet/1");
    expect(response.status).toBe(500);
    expect(response.text).toBe(
      '"server encountered an unexpected condition that prevented it from fulfilling the request."'
    );
  });
});
describe("POST /api/pet", () => {
  it("should return 201 and the pet", async () => {
    const mockPets = {
      id: "1",
      name: "Max",
      age: 5,
      type: "dog",
      status: "available",
    };
    petRepository.find.mockResolvedValue([]);
    petRepository.create.mockResolvedValue(mockPets);
    const response = await request(app).post("/api/pet").send(mockPets);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockPets);
  });
  it("should return status 500 when the server encountered an unexpected condition that prevented it from fulfilling the request.", async () => {
    petRepository.find.mockRejectedValue(new ServerError());
    const response = await request(app).get("/api/pet");
    expect(response.status).toBe(500);
    expect(response.text).toBe(
      '"server encountered an unexpected condition that prevented it from fulfilling the request."'
    );
  });
});
// describe("PUT /api/pet/:id", () => {
//   it("should return 200 and the pet", async () => {
//     const mockPets = {
//       id: "1",
//       name: "Max",
//       age: 5,
//       type: "dog",
//       status: "available",
//     };
//     petRepository.find.mockResolvedValue(mockPets);
//     petRepository.update.mockResolvedValue(mockPets);
//     const response = await request(app).put("/api/pet/1").send(mockPets);
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual(mockPets);
//   });
//   it("should return status 500 when the server encountered an unexpected condition that prevented it from fulfilling the request.", async () => {
//     petRepository.retrieve.mockRejectedValue(new ServerError());
//     const response = await request(app).put("/api/pet/1");
//     expect(response.status).toBe(500);
//     expect(response.text).toBe(
//       '"server encountered an unexpected condition that prevented it from fulfilling the request."'
//     );
//   });
// });
