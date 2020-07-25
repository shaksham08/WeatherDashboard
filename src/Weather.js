import React, { Component } from "react";
import axios from "axios";
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
      loading: "loaded",
    };
    this.API_KEY = "f1d3869b47a9e7d6deac4290c4ec72a1";
    this.getData = this.getData.bind(this);
    this.kelvintocelcius = this.kelvintocelcius.bind(this);
    this.changeBackground = this.changeBackground.bind(this);
  }

  componentDidMount() {
    this.getData("Delhi");
  }
  changeBackground() {
    let id = this.state.iconid;
    if (id >= 200 && id <= 232) {
      return "Thunderstorm";
    } else if (id >= 300 && id <= 321) {
      return "Drizzle";
    } else if (id >= 500 && id <= 531) {
      return "Rain";
    } else if (id >= 600 && id <= 622) {
      return "Snow";
    } else if (id >= 801 && id <= 804) {
      return "Clouds";
    } else if (id === 800) {
      return "Clear";
    } else {
      return "Others";
    }
  }

  async getData(city) {
    try {
      this.setState({
        loading: "loading",
      });
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
        loading: "loaded",
      });
    } catch (Err) {
      // toast.error("City Not Found", {
      //   position: toast.POSITION.BOTTOM_CENTER,
      // });
      this.setState({
        error: true,
      });
      setTimeout(() => {
        if (this.state.loading !== "loaded") {
          this.setState({
            loading: "error",
          });
        }
      }, 5000);
    }
  }

  kelvintocelcius(k) {
    return Math.floor(k - 273.15);
  }
  render() {
    let torender;
    if (this.state.loading === "loaded") {
      torender = (
        <section>
          <h1 className="city-name">{`${this.state.city}, ${this.state.country}`}</h1>
          <i className={`wi wi-owm-${this.state.iconid}`}></i>
          <div className="description">{this.state.description}</div>
          <div className="temp">{this.state.temp} &deg;c</div>
          <div className="minmax">
            <div>Min : {this.state.min} &deg;c</div>
            <div>Max : {this.state.max} &deg;c</div>
          </div>
        </section>
      );
    } else if (this.state.loading === "loading") {
      torender = <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>;
    } else if (this.state.loading === "error") {
      torender = (
        <section className="wrong">
          <i className="img far fa-sad-tear"></i>
          <h1> OPPS!!! Something Went Wrong!!</h1>
        </section>
      );
    }
    return (
      <div className={`main ${this.changeBackground()}`}>
        <div className="form">
          <Form getData={this.getData} />
        </div>
        {torender}
      </div>
    );
  }
}
