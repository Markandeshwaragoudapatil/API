const { before, after, test } = require("node:test");
const assert = require("node:assert/strict");

process.env.JWT_SECRET = "automated-test-secret-do-not-use-in-production";

const { app } = require("../app");

let server;
let baseUrl;

before(async () => {
    server = app.listen(0);
    await new Promise((resolve, reject) => {
        server.once("listening", resolve);
        server.once("error", reject);
    });
    baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
    if (server) {
        await new Promise((resolve, reject) => {
            server.close((error) => error ? reject(error) : resolve());
        });
    }
});

test("protected profile endpoint rejects requests without a JWT cookie", async () => {
    const response = await fetch(`${baseUrl}/profile`);

    assert.equal(response.status, 401);
    assert.deepEqual(await response.json(), {
        message: "Token required, Please login"
    });
});

test("product collection endpoint rejects unauthenticated requests", async () => {
    const response = await fetch(`${baseUrl}/products`);

    assert.equal(response.status, 401);
    assert.deepEqual(await response.json(), {
        message: "Token required, Please login"
    });
});

test("single-product endpoint checks authentication before accessing the database", async () => {
    const response = await fetch(`${baseUrl}/products/507f1f77bcf86cd799439011`);

    assert.equal(response.status, 401);
    assert.deepEqual(await response.json(), {
        message: "Token required, Please login"
    });
});

test("logout endpoint requires authentication", async () => {
    const response = await fetch(`${baseUrl}/logout`, { method: "DELETE" });

    assert.equal(response.status, 401);
    assert.deepEqual(await response.json(), {
        message: "Token required, Please login"
    });
});

test("protected endpoints reject an invalid JWT", async () => {
    const response = await fetch(`${baseUrl}/profile`, {
        headers: { cookie: "token=not-a-valid-jwt" }
    });

    assert.equal(response.status, 401);
    assert.deepEqual(await response.json(), { message: "Invalid Token" });
});

test("unknown paths return the documented JSON error", async () => {
    const response = await fetch(`${baseUrl}/does-not-exist`);

    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { message: "Invalid URL" });
});

test("the test suite can start the Express app without a running MongoDB instance", async () => {
    assert.ok(server.listening);
    assert.ok(baseUrl.startsWith("http://127.0.0.1:"));
});
