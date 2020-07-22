import React, { Component } from "react";
import "./Form.css";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      city: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.getData(this.state.city);
    this.setState({
      city: "",
    });
  }

  render() {
    return (
      <div className="form-div">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="city"
            value={this.state.city}
            onChange={this.handleChange}
          />
          <button className="btn">Get Weather</button>
        </form>
      </div>
    );
  }
}
