import React, { Component } from "react";
import { List, Avatar, Card, Divider } from "antd";
import fire from "../assets/fire.gif";
import moment from "moment";

import announcementLogo from "../assets/announcements.svg";

const { Meta } = Card;

class Announcements extends Component {
  constructor() {
    super();
    this.state = {
      announcements: [],
    };
  }

  componentDidMount() {
    this.setState({
      announcements: [
        {
          title: moment(new Date("3/1/2020")).fromNow(),
          description: "Red Wristband lunch time!",
        },
        {
          title: moment(new Date("2/29/2020")).fromNow(),
          description: "Orange Wristband Lunch time!",
        },
        {
          title: moment(new Date("2/25/2020")).fromNow(),
          description: "Blue Wristband Lunch time!",
        },
        {
          title: moment(new Date("1/1/2020")).fromNow(),
          description: "White Wristband Lunch time!",
        },
      ],
    });
  }

  render() {
    return (
      <Card
        bordered={true}
        style={{
          backgroundColor: "white",
          borderRadius: "15px",
          marginLeft: "5%",
          marginRight: "10%",
          marginTop: "10%",
          height: "90%",
        }}
      >
        <Meta
          title={
            <div>
              <img
                src={announcementLogo}
                style={{ height: "15%", width: "15%", float: "left" }}
              />
              <h1
                style={{
                  color: "#1A2E33",
                  paddingLeft: "25%",
                  fontFamily: "Aleo",
                }}
              >
                <b>Annoucements</b>
              </h1>
            </div>
          }
          style={{ color: "#1A2E33" }}
        />
        {/* <Divider style={{marginBottom:'5%',marginTop:'1%'}}/> */}
        <Divider />
        <List
          itemLayout="horizontal"
          dataSource={this.state.announcements}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={fire} />}
                title={
                  <h4
                    style={{
                      color: "#1A2E33 ",
                      fontFamily: "Avenir LT Std 55 Roman",
                    }}
                  >
                    {item.title}
                  </h4>
                }
                description={
                  <h2
                    style={{
                      color: "#1A2E33 ",
                      fontFamily: "Avenir LT Std 55 Roman",
                    }}
                  >
                    {item.description}
                  </h2>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    );
  }
}

export default Announcements;
