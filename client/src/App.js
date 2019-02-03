import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

const _ = require("lodash");

const options = [
  { value: "YES", label: "YES" },
  { value: "NO", label: "NO" },
  { value: "NA", label: "?" }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      idInvestor: "5c55c8e2dc7db4627ee158fe",
      companies: undefined,
      criterias: [
        {
          _id: "5c55c8e2dc7db4627ee15900",
          value: "YES",
          __v: 0
        },
        {
          _id: "5c55c8e2dc7db4627ee15901",
          value: "YES",
          __v: 0
        }
      ],
      criteriasArray: [
        {
            _id: "5c55c8e2dc7db4627ee15900",
            criteria: "Stage is Seed or Series A",
            explanation: "Seed",
            importance: 100,
            label: "Must Have",
            labelImportance: 1,
            value: "YES",
            __v: 0
        },
        {
            _id: "5c55c8e2dc7db4627ee15901",
            criteria: "Founding team has experience in the industry",
            explanation: "",
            importance: 30,
            label: "Super Nice To Have",
            labelImportance: 2,
            value: "NO",
            __v: 0
        }
      ]
    };
  }

  componentDidMount() {
    axios
      .post("http://localhost:5000/", {
        idInvestor: "5c55c8e2dc7db4627ee158fe"
      })
      .then(response =>
        this.setState({
          ...this.state,
          companies: response.data.companies,
          criterias: response.data.companies.map(companie => companie.criterias)
        })
      )
      .catch(err => {
        console.log(err);
      });
  }

  calculateScore = (label, criteriaArrays) => {
    _.countBy(criteriaArrays, (criteria) => 
         criteria.label === label
    )
  }

  handleChange = (selectedOption, criteria) => {
    let { criterias } = this.state;

    if (_.find(criterias[0], { _id: criteria._id }) !== undefined) {
      let index = _.findIndex(criterias[0], { _id: criteria._id });
      criterias[0][index].value = selectedOption.value;
    }

    this.setState({ ...this.state, criterias: criterias });

  };

  render() {

    var obj =  _.countBy([{id: 2, label: "Must Have"},{id: 3, label:"Must Have"}], (criteria) => criteria.label === "Must Have")
    console.log(obj)

    return (
      <div className="App">
        <h1>{this.state.idInvestor}</h1>
        {this.state.companies !== undefined &&
          this.state.companies.map((company, i) => (
            <div key={i}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <p style={{ marginRight: 10 }}>{company.name}</p>
                <p style={{ marginRight: 10 }}>{company.mustHaveScore}</p>
                <p style={{ marginRight: 10 }}>{company.callToAction}</p>
                <button style={{ background: "green" }}>Meet</button>
                <button style={{ background: "red" }}>Pass</button>
              </div>
              <div style={{ textAlign: "left" }}>
                <h1>Criterias</h1>
                {company.criterias.map((criteria, e) => (
                  <div
                    key={e}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "left"
                    }}
                  >
                    <p style={{ marginRight: 10 }}>{criteria.criteria}</p>
                    <p style={{ marginRight: 10 }}>{criteria.value}</p>
                    <Select
                      value={_.find(this.state.criterias[0], { _id: criteria._id })["value"]}
                      onChange={event => this.handleChange(event, criteria)}
                      options={options}
                    />
                  </div>
                ))}
              </div>
              <button style={{marginTop: 40}}>Save Criterias</button>
            </div>
          ))}
      </div>
    );
  }
}

export default App;
