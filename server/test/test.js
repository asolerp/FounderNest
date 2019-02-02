//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");

const Investor = require("../models/Investor");
const Company = require("../models/Company");
const Criteria = require("../models/Criteria");

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Investor', () => {
    beforeEach((done) => { //Before each test we empty the database
      done();
    });

/*
  * Test the /GET route
  */

  describe('/GET companies of an specific investor', () => {
      it('it should GET all the companies', (done) => {
        chai.request(server)
            .get('/')
            .send({"idInvestor":"5c55ad5e77ac0b436d81093f"})
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
              done();
            });
      });
  });

  describe('/GET companies of an specific investor', () => {
    it('it should GET a error message if not investor was found', (done) => {
      chai.request(server)
          .get('/')
          .send({"idInvestor":"5c55ad5e77ac036d81093f"})
          .end((err, res) => {
                res.should.have.status(500);
                res.body.should.have.property('message').eql('Investor does not found');
            done();
          });
    });
});


  /*
  * Test the /POST routes
  */

});