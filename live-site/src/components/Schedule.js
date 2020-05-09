import React, { Component } from 'react';
import Tabletop from 'tabletop';
import { Spin, Icon, Card, Divider, List, Avatar } from 'antd';
import moment from 'moment';
import scheduleLogo from '../assets/schedule.svg'
import fire from '../assets/fire.gif'

const { Meta } = Card;

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Schedule extends Component{
    
    constructor(){
        super();
        this.state = {
            data: [],
            columnNames: [],
            date: new Date(),
        }
    }

    componentDidMount(){
        Tabletop.init({
            key: '1eRtAXuTrZ9IzpYGqTNh6mTQUdlOb6_d0kHVmPu2QfL0',
            callback: googleData => {
                this.setState({
                    data: googleData['App  Website Schedule']['elements'],
                    columnNames: googleData['App  Website Schedule']['columnNames']
                })
            },
            simpleSheet: false
        })
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
          date: new Date()
        });
    }

    filterEvents(){
        const passed = [];
        const current = [];
        const future = [];

        this.state.data.forEach(event => {
            const startDate = new Date(event[this.state.columnNames[6]])
            const endDate = new Date(event[this.state.columnNames[11]])

            if(this.state.date >= startDate.getTime() && this.state.date <= endDate.getTime()){
                current.push(event)
            }
            else if(this.state.date < endDate){
                if(future.length < 3){
                    future.push(event)
                }
            }
            else if(this.state.date > startDate){
                if(passed.length < 3){
                    passed.push(event)
                }
                else{
                    passed.shift();
                    passed.push(event);
                }
            }
        });

        return [passed, current, future]
    }

    getEventData(events, flag){
        
        const data = []

        events.forEach(item => {
            const title = item[this.state.columnNames[1]]
            const startDate = new Date(item[this.state.columnNames[6]])
            const endDate = new Date(item[this.state.columnNames[11]])
            
            const text = (flag ? "Now" : moment(startDate).format('LT')) + " - " + moment(endDate).format('LT')
           
            data.push({ 
                title,
                description: text,
            })
        });
       
        return data
    }

    render(){

        let contents;

        if(this.state.data.length === 0){
            
            contents = <div style={{textAlign:'center'}}>
                            <Spin indicator={antIcon} />
                            <h3 style={{color: '1A2E33'}}>Loading</h3>
                        </div>
               
        }
        else{

            let res = this.filterEvents();
            contents = <List
                            itemLayout="horizontal"
                            dataSource={this.getEventData(res[1],true).concat(this.getEventData(res[2],false))}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                avatar={<Avatar src={fire} />}
                                title={<h2 style={{color : '#1A2E33 ',fontFamily: 'Avenir LT Std 55 Roman'}}>{item.title}</h2>}
                                description={<h4 style={{color : '#1A2E33 ',fontFamily: 'Avenir LT Std 55 Roman'}}>{item.description}</h4>}
                                />
                            </List.Item>
                            )}
                        />
        }

        return (

            <Card bordered={true} style={{ backgroundColor:'white', borderRadius:'15px', marginLeft: '10%', marginRight:'5%',marginTop:'10%', height:'90%'}}>
                <Meta
                    title={<div><img src={scheduleLogo} style={{height:'12%',width:'12%', float:'left'}}/><h1 style={{color:"#1A2E33", paddingLeft:'30%',fontFamily: 'Aleo'}}><b>Schedule</b></h1></div>}
                    style={{color:'#1A2E33'}}
                />
                {/* <Divider style={{marginBottom:'5%',marginTop:'1%'}}/> */}
                <Divider/>
                
                {contents}
    
            </Card>
        );
    }
}

export default Schedule;