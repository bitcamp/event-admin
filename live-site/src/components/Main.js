import React from "react";
import "../App.css";
import Schedule from "./Schedule.js";
import Time from "./Time.js";
import Announcements from "./Announcements.js";
import Leaderboard from "./Leaderboard.js";
import bitcamp_logo from "../assets/logotype.png";
import { Row, Col, Layout } from "antd";

const { Header, Content } = Layout;

function Main() {
  return (
    <div className="App">
      <Layout>
        <Header style={{ backgroundColor: "transparent" }}>
          <Row>
            <Col span={8}>
              <Time />
            </Col>
            <Col span={8}>
              <div>
                <img
                  src={bitcamp_logo}
                  style={{
                    height: "70%",
                    width: "70%",
                    paddingLeft: "20%",
                    marginTop: "8%",
                  }}
                />
              </div>
            </Col>
            <Col span={8}></Col>
          </Row>
        </Header>
        <Content>
          <Row type="flex">
            <Col span={8}>
              <Schedule />
            </Col>
            <Col span={8}>
              <Leaderboard />
            </Col>
            <Col span={8}>
              <Announcements />
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}

export default Main;
