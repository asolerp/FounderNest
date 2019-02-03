import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

const options = [
  { value: "YES", label: "YES" },
  { value: "NO", label: "NO" },
  { value: "NA", label: "?" }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idInvestor: "5c55c8e2dc7db4627ee158fe",
      companies: undefined,
      criterias: []
    };
  }

  componentDidMount() {
    axios
      .post("http://localhost:5000/", {
        idInvestor: "5c55c8e2dc7db4627ee158fe"
      })
      .then(response =>
        this.setState({ ...this.state, companies: response.data.companies })
      )
      .catch(err => {
        console.log(err);
      });
  }

  handleChange = selectedOption => {
    console.log(`Option selected:`, selectedOption);
  };

  render() {
    return (
      <div className="App">
        <h1>{this.state.idInvestor}</h1>
        {this.state.companies !== undefined &&
          this.state.companies.map((company, i) => (
            <div>
              <div key={i} style={{ display: "flex", flexDirection: "row" }}>
                <p style={{ marginRight: 10 }}>{company.name}</p>
                <p style={{ marginRight: 10 }}>{company.mustHaveScore}</p>
                <p style={{ marginRight: 10 }}>{company.callToAction}</p>
                <button style={{ background: "green" }}>Meet</button>
                <button style={{ background: "red" }}>Pass</button>
              </div>
              <div style={{ textAlign: "left" }}>
                <h1>Criterias</h1>
                {company.criterias.map((criteria, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "left"
                    }}
                  >
                    <p style={{ marginRight: 10 }}>{criteria.criteria}</p>
                    <p style={{ marginRight: 10 }}>{criteria.value}</p>
                    <Select
                      value={"NO"}
                      onChange={this.handleChange}
                      options={options}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default App;
