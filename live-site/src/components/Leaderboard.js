import React, { Component } from "react";

import { Card, Divider, Row } from "antd";

import redLogo from "../assets/RedTeamLogo.png";
import greenLogo from "../assets/GreenTeamLogo.png";
import blueLogo from "../assets/BlueTeamLogo.png";
import leaderboardLogo from "../assets/leaderboard.svg";
import Team from "./Team.js";

const { Meta } = Card;

class Leaderboard extends Component {
  constructor() {
    super();
    this.state = {
      bluePoints: 0,
      redPoints: 0,
      greenPoints: 0,
    };
  }
  componentDidMount() {
    this.setState({
      bluePoints: 1000,
      redPoints: 200,
      greenPoints: 10,
    });
  }

  render() {
    return (
      <Card
        bordered={true}
        style={{
          backgroundColor: "white",
          borderRadius: "15px",
          marginTop: "10%",
          height: "90%",
        }}
      >
        <Meta
          title={
            <div>
              <img
                src={leaderboardLogo}
                style={{ height: "18%", width: "18%", float: "left" }}
              />
              <h1
                style={{
                  color: "#1A2E33",
                  paddingLeft: "35%",
                  fontFamily: "Aleo",
                }}
              >
                <b>Leaderboard</b>
              </h1>
            </div>
          }
        />
        {/* <Divider style={{marginBottom:'5%',marginTop:'1%'}}/> */}
        <Divider />

        <div>
          <Row>
            <Team
              logo={blueLogo}
              team="Blue"
              points={this.state.bluePoints}
              outerLeftColor="#FFDD29"
              outerRightColor="#FDB040"
              innerColor="#FFF0CE"
            />
          </Row>
          <Row>
            <Team
              logo={redLogo}
              team="Red"
              points={this.state.redPoints}
              outerLeftColor="#F0EFF5"
              outerRightColor="#8D9093"
              innerColor="#F4F4F4"
            />
          </Row>
          <Row>
            <Team
              logo={greenLogo}
              team="Green"
              points={this.state.greenPoints}
              outerLeftColor="#FFA15C"
              outerRightColor="#925401"
              innerColor="#E5D4C0"
            />
          </Row>
        </div>
      </Card>
    );
  }
}

export default Leaderboard;
