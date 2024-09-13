const { app, server } = require("../app");
const request = require("supertest");
const db = require("../database");
const api = request(app);

module.exports = { api, server, db };
