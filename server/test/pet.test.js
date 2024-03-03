const app = require("../server");
const { ServerError } = require("../errors/errors");
const { petRepository } = require("../repository/pet.repository");
const request = require("supertest");
const { describe } = require("node:test");
jest.mock("../repository/pet.repository");

// describe("GET /api/report", () => {
//   it("should return 200 and all reports", async () => {
//     const mockReports = [
//       {
//         id: "1",
//         location: "Building A, Room 101",
//         description: "Cracked wall",
//         severity: "high",
//         status: 50,
//         timestamp: "2024-02-27T10:30:00",
//         submittedBy: "John Doe",
//         assignedTo: "Maintenance Team A",
//         comments: [
//           {
//             author: "Maintenance Team A",
//             text: "Scheduled repair for tomorrow.",
//           },
//           {
//             author: "John Doe",
//             text: "Please expedite the repair. It's urgent.",
//           },
//         ],
//         attachments: [
//           {
//             url: "https://www.icertified.com.au/news/wp-content/uploads/2019/01/cracked-wall-flickr-s2art.jpg",
//           },
//         ],
//       },
//       {
//         id: "2",
//         location: "Building B, Room 202",
//         description: "Leaking faucet",
//         severity: "low",
//         status: 20,
//         timestamp: "2024-02-27T11:30:00",
//         submittedBy: "Jane Smith",
//         assignedTo: "Maintenance Team B",
//         comments: [
//           {
//             author: "Maintenance Team B",
//             text: "Faucet repaired.",
//           },
//         ],
//         attachments: [
//           {
//             url: "https://www.icertified.com.au/news/wp-content/uploads/2019/01/leaking-faucet.jpg",
//           },
//         ],
//       },
//     ];
//     petRepository.find.mockResolvedValue(mockReports);
//     const response = await request(app).get("/api/report");
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual(mockReports);
//   });
//   it("should return 404 and No data found", async () => {
//     petRepository.find.mockResolvedValue([]);
//     const response = await request(app).get("/api/report");
//     expect(response.status).toBe(404);
//     expect(response.text).toBe('"No data found"');
//   });
//   it("should return status 500 when the server encountered an unexpected condition that prevented it from fulfilling the request.", async () => {
//     petRepository.find.mockRejectedValue(new ServerError());
//     const response = await request(app).get("/api/report");
//     expect(response.status).toBe(500);
//     expect(response.text).toBe(
//       '"server encountered an unexpected condition that prevented it from fulfilling the request."'
//     );
//   });
// });
// describe("GET /api/report/:id", () => {
//   it("should return 200 and the report", async () => {
//     const mockReports = [
//       {
//         id: "1",
//         location: "Building A, Room 101",
//         description: "Cracked wall",
//         severity: "high",
//         status: 50,
//         timestamp: "2024-02-27T10:30:00",
//         submittedBy: "John Doe",
//         assignedTo: "Maintenance Team A",
//         comments: [
//           {
//             author: "Maintenance Team A",
//             text: "Scheduled repair for tomorrow.",
//           },
//           {
//             author: "John Doe",
//             text: "Please expedite the repair. It's urgent.",
//           },
//         ],
//         attachments: [
//           {
//             url: "https://www.icertified.com.au/news/wp-content/uploads/2019/01/cracked-wall-flickr-s2art.jpg",
//           },
//         ],
//       },
//       {
//         id: "2",
//         location: "Building B, Room 202",
//         description: "Leaking faucet",
//         severity: "low",
//         status: 20,
//         timestamp: "2024-02-27T11:30:00",
//         submittedBy: "Jane Smith",
//         assignedTo: "Maintenance Team B",
//         comments: [
//           {
//             author: "Maintenance Team B",
//             text: "Faucet repaired.",
//           },
//         ],
//         attachments: [
//           {
//             url: "https://www.icertified.com.au/news/wp-content/uploads/2019/01/leaking-faucet.jpg",
//           },
//         ],
//       },
//     ];
//     petRepository.retrieve.mockResolvedValue(mockReports);
//     const response = await request(app).get("/api/report/1");
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual(mockReports);
//   });
// });

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
  it("should return 404 and no pet found", async () => {
    petRepository.retrieve.mockResolvedValue([]);
    const response = await request(app).get("/api/pet/1");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Pet with id: 1 does not exist");
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
