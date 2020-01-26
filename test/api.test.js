"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

chai.should();
chai.use(chaiHttp);

describe("GET /", () => {
	it("should render an startpage", done => {
		chai.request(app)
			.get("/")
			.end((err, res) => {
				res.should.have.status(200);
				res.should.be.html;
				done();
			});
	});
});

describe("GET /", () => {
	it("should render an user page", done => {
		chai.request(app)
			.get("/users")
			.end((err, res) => {
				res.should.have.status(200);
				res.should.be.html;
				done();
			});
	});
});
