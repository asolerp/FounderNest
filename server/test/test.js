//During the test the env variable is set to test
process.env.NODE_ENV = "test";

const Company = require("../models/Company");


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

  describe("/POST companies of an specific investor", () => {

    it("it should POST a error message if not investor was found", done => {
      chai
        .request(server)
        .post("/")
        .send({ idInvestor: "5c55c8e2dc7db47ee158fe" })
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have
            .property("message")
            .eql("Investor does not found");
          done();
        });
    });

    it("it should POST all the companies", done => {
      chai
        .request(server)
        .post("/")
        // use a correct ID from the DB
        .send({ idInvestor: "5c58ba7dcf6f760ff1733ab2" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });


  /*
   * Test the /POST routes
   */

  // Testing action of a company

  describe("/POST actions ", () => {
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
      // correct investor ID and company ID from db
      const companyAction = {
        idInvestor: "5c58ba7dcf6f760ff1733ab2",
        idCompany: "5c58ba7dcf6f760ff1733ab3",
        action: "DE"
      };
      Company.findOneAndUpdate(
        { _id: companyAction.idCompany },
        { $set: { callToAction: companyAction.action } },
        { new: true }
      )
        .then(() => {
          chai
            .request(server)
            .post("/postAction")
            .send(companyAction)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("message").eql("Action make!");
              res.body.should.have.property("companies");
              res.body.companies[0].callToAction.should.eql(
                companyAction.action
              );
              done();
            });
        })
        .catch(err => console.log(err));
    });
  });
});

describe("/POST criterias", () => {

  it("it should POST a error message if a criteria cannot be updated", done => {
    const updateCriteria = {
      idInvestor:"5c55c8e2dc7db4627ee158fe",
      criterias: [
        {
          _id: "5c55c8e2dcb4627ee15900",
          criteria: "Stage is Seed or Series A",
          explanation: "Seed",
          importance: 100,
          label: "Must Have",
          labelImportance: 1,
          value: "NO"
        },
        {
          _id: "5c55c8e2dc7db4627ee901",
          criteria: "Founding team has experience in the industry",
          explanation: "",
          importance: 30,
          label: "Super Nice To Have",
          labelImportance: 2,
          value: "NO"
        }
      ]
    };
    chai
      .request(server)
      .post("/postCriterias")
      .send(updateCriteria)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.have
        .property("message")
        .eql("Error trying to update criterias");
        done();
      });
  });

  it("it should POST a criteria update ", done => {

    const updateCriteria = {
      idInvestor:"5c58ba7dcf6f760ff1733ab2",
      criterias: [
        {
          _id: "5c58ba7dcf6f760ff1733ab4",
          criteria: "Stage is Seed or Series A",
          explanation: "Seed",
          importance: 100,
          label: "Must Have",
          labelImportance: 1,
          value: "NA"
        },
        {
          _id: "5c58ba7dcf6f760ff1733ab5",
          criteria: "Founding team has experience in the industry",
          explanation: "",
          importance: 30,
          label: "Super Nice To Have",
          labelImportance: 2,
          value: "NO"
        }
      ]
    };
    chai
      .request(server)
      .post("/postCriterias")
      .send(updateCriteria)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("Criteria updated!");
        res.body.should.have.property("companies");
        res.body.companies[0].criterias[0].value.should.eql(
          updateCriteria.criterias[0].value
        );
        done();
      });
  });

});
