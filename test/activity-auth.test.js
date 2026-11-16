import assert from "node:assert/strict";
import { once } from "node:events";
import test from "node:test";
import express from "express";

process.env.SUPABASE_URL = "https://example.invalid";
process.env.SUPABASE_API_KEY = "test-key";
const adminToken = "test-admin-token-0123456789-0123456789";

const { default: ActivityRouter } = await import("../api/controllers/Activity.controller.js");
const { default: AuthRouter } = await import("../api/controllers/Auth.controller.js");
const { default: activityService } = await import("../api/services/Activity.service.js");

test("activity mutations require a configured admin token", async () => {
  let creates = 0;
  let deletes = 0;
  activityService.create = async () => { creates++; return [{ id: 123 }]; };
  activityService.deleteById = async () => { deletes++; };

  const app = express();
  app.use(express.json());
  app.use("/activities", ActivityRouter);
  app.use("/auth", AuthRouter);
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  const origin = `http://127.0.0.1:${server.address().port}`;
  const request = (path, method, token) => fetch(origin + path, {
    method,
    headers: { "content-type": "application/json", ...(token ? { authorization: `Bearer ${token}` } : {}) },
    ...(method === "POST" ? { body: JSON.stringify({ title: "test", category: "coding", date: "2025-01-01" }) } : {}),
  });

  try {
    delete process.env.ADMIN_TOKEN;
    assert.equal((await request("/auth/token", "GET", adminToken)).status, 401);
    assert.equal((await request("/activities", "POST", adminToken)).status, 401);
    process.env.ADMIN_TOKEN = "short";
    assert.equal((await request("/auth/token", "GET", "short")).status, 401);

    process.env.ADMIN_TOKEN = adminToken;
    for (const token of [undefined, "wrong", "12345b67"]) {
      assert.equal((await request("/auth/token", "GET", token)).status, 401);
      assert.equal((await request("/activities", "POST", token)).status, 401);
      assert.equal((await request("/activities/123", "DELETE", token)).status, 401);
    }
    assert.equal(creates, 0);
    assert.equal(deletes, 0);
    assert.equal((await request("/activities/options", "GET")).status, 200);
    assert.equal((await request("/auth/token", "GET", adminToken)).status, 200);
    assert.equal((await request("/activities", "POST", adminToken)).status, 201);
    assert.equal((await request("/activities/123", "DELETE", adminToken)).status, 200);
    assert.equal(creates, 1);
    assert.equal(deletes, 1);
  } finally {
    server.close();
    await once(server, "close");
  }
});
