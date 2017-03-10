import React, { Component } from 'react';
import appService from '../../services/app-service';


export default class Home extends Component {
    // constructor(props) {
    //     super(props);
    // }
    componentDidMount() {
        appService.getUserInfo().then(result => {
            console.log(result);
        });
    }
    render() {
        return (
            <div>
                <p>Hello React!!!</p>
                <img src={require('../../images/react-logo.png')} />
            </div>
        );
    }
}
