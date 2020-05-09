import React from 'react';

import { Card } from 'antd';

function createLinearGradient(leftColor, rightColor){
    return "linear-gradient(to right, " + leftColor + ", " + rightColor + ")"
}

function Team(props){

    return(

        <Card bordered={true} style={{textAlign:'center', borderRadius:'15px',marginBottom:'3%', backgroundImage:createLinearGradient(props.outerLeftColor, props.outerRightColor)}}>
            <Card bordered={true} style={{textAlign:'center', borderRadius:'15px', backgroundColor:props.innerColor}}>
                <img src={props.logo} style={{height:'20%',width:'20%', float:'left'}}/>
                <h2 style={{color : '#1A2E33 ',fontFamily: 'Avenir LT Std 55 Roman'}}><b>{props.team}</b></h2>
                <h4 style={{color : '#1A2E33 ',fontFamily: 'Avenir LT Std 55 Roman'}}>{props.points} Points</h4>
            </Card>
        </Card>
    )
    
}

export default Team;