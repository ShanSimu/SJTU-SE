import React from 'react';
import {Router, Route, Switch,} from 'react-router-dom';
import {LoginView} from "./views/LoginView";
import {history} from "./utils/history";
import {homeView} from "./views/HomeView";
import {RegisterView} from "./views/RegisterView";
import {adminHomeView} from "./views/adminHomeView";

export class BasicRouter extends React.Component{

    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            console.log(location,action);
        });
    }

    render(){
        return(
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={LoginView} />
                    <Route exact path="/user" component = {homeView} />
                    <Route exact path="/register" component={RegisterView} />
                    <Route exact path="/admin" component={adminHomeView} />
                </Switch>
            </Router>
        )
    }
}
