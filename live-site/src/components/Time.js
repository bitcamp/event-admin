import React, { Component } from "react";
import moment from "moment";

class Time extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    let day_map = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
    };

    return (
      <div>
        <h5
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            color: "#1A2E33",
            marginTop: "7%",
            fontFamily: "Aleo",
          }}
        >
          <b>
            {day_map[this.state.date.getDay()] +
              " " +
              moment(this.state.date).format("LT")}
          </b>
        </h5>
      </div>
    );
  }
}

export default Time;
