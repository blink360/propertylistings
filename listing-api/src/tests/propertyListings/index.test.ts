import request from "supertest";
import app from "../../index";

describe("GET /listings", () => {
  it("filters by price range", async () => {
    const res = await request(app).get("/listings?price_min=500000&price_max=800000");

    expect(res.status).toBe(200);
    res.body.data.data.forEach((property: any) => {
      expect(property.price).toBeGreaterThanOrEqual(500000);
      expect(property.price).toBeLessThanOrEqual(800000);
    });
  });

  it("hides internal_notes for non-admin users", async () => {
    const res = await request(app).get("/listings");

    expect(res.status).toBe(200);
    res.body.data.data.forEach((property: any) => {
      expect(property).not.toHaveProperty("internal_notes");
    });
  });

  it("shows internal_notes for admin users", async () => {
    const res = await request(app).get("/listings").set("x-role", "admin");

    expect(res.status).toBe(200);
    res.body.data.data.forEach((property: any) => {
      expect(property).toHaveProperty("internal_notes");
    });
  });
});

describe("GET /listings/:id", () => {
  it("returns a single property by id", async () => {
    const res = await request(app).get("/listings/1");

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("id", 1);
    expect(res.body.data).toHaveProperty("title");
    expect(res.body.data).toHaveProperty("price");
  });

  it("returns 404 for a non-existent id", async () => {
    const res = await request(app).get("/listings/9999");

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "Listing not found");
  });
});