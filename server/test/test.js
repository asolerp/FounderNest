//During the test the env variable is set to test
process.env.NODE_ENV = "test";

const mongoose = require("mongoose");

const Investor = require("../models/Investor");
const Company = require("../models/Company");
const Criteria = require("../models/Criteria");

//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("Investor", () => {
  beforeEach(done => {
    //Before each test we empty the database
    done();
  });

  /*
   * Test the /GET route
   */

  describe("/GET companies of an specific investor", () => {
    it("it should GET all the companies", done => {
      chai
        .request(server)
        .get("/")
        .send({ idInvestor: "5c55c8e2dc7db4627ee158fe" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/GET companies of an specific investor", () => {
    it("it should GET a error message if not investor was found", done => {
      chai
        .request(server)
        .get("/")
        .send({ idInvestor: "5c55c8e2dc7db47ee158fe" })
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have
            .property("message")
            .eql("Investor does not found");
          done();
        });
    });
  });

  /*
   * Test the /POST routes
   */

  describe("/POST ", () => {
    it("it should get an erro message if POST with uncomplete info", done => {
      const companyAction = {
        idInvestor: "5c55c2dc7db4627ee158fe",
        idCompany: "5c55c8e27db27ee158ff",
        action: "DE"
      };
      chai
        .request(server)
        .post("/postAction")
        .send(companyAction)
        .end((err, res, req) => {
          res.should.have.status(500);
          res.body.should.have
            .property("message")
            .eql("Error trying to make an action");
          done();
        });
    });
    it("it should POST an action ", done => {
      const companyAction = {
        idInvestor: "5c55c8e2dc7db4627ee158fe",
        idCompany: "5c55c8e2dc7db4627ee158ff",
        action: "DE"
      };
      Company.findOneAndUpdate(
        { _id: companyAction.idCompany },
        { $set: { callToAction: companyAction.action } },
        { new: true }
      ).then(() => {
        chai
          .request(server)
          .post("/postAction")
          .send(companyAction)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("Action make!");
            res.body.should.have.property("companies");
            res.body.companies[0].callToAction.should.eql(companyAction.action);
            done();
          });
      });
    });
  });
});
