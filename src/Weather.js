import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "./component/Form";
import "./Weather.css";

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      temp: "",
      min: "",
      max: "",
      iconid: "",
      description: "",
      error: false,
      country: "",
    };
    this.API_KEY = "f1d3869b47a9e7d6deac4290c4ec72a1";
    this.getData = this.getData.bind(this);
    this.kelvintocelcius = this.kelvintocelcius.bind(this);
  }

  componentDidMount() {
    this.getData("Delhi");
  }
  async getData(city) {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}`
      );
      this.setState({
        city: response.data.name,
        temp: this.kelvintocelcius(response.data.main.temp),
        min: this.kelvintocelcius(response.data.main.temp_min),
        max: this.kelvintocelcius(response.data.main.temp_max),
        iconid: response.data.weather[0].id,
        description: response.data.weather[0].description,
        error: false,
        country: response.data.sys.country,
      });
    } catch (Err) {
      toast.error("City Not Found", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      this.setState({
        error: true,
      });
    }
  }

  kelvintocelcius(k) {
    return Math.floor(k - 273.15);
  }
  render() {
    return (
      <div className="main">
        <div className="form">
          <Form getData={this.getData} />
        </div>
        <h1 className="city-name">{`${this.state.city}, ${this.state.country}`}</h1>
        <i className={`wi wi-owm-${this.state.iconid}`}></i>
        <div className="description">{this.state.description}</div>
        <div className="temp">{this.state.temp} &deg;c</div>
        <div className="minmax">
          <div>Min : {this.state.min} &deg;c</div>
          <div>Max : {this.state.max} &deg;c</div>
        </div>
        <ToastContainer transition={Zoom} />
      </div>
    );
  }
}
