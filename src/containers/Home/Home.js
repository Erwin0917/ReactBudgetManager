import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

import Nav from "../Nav/Nav";

import Dashbord from "../Dashbord/Dashbord";
import Raports from "../Raports/Raports";
import Planning from "../Planning/Planning";

class Home extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <Router>
                <div className="wrapper__flex">
                    <Nav/>
                    <div className={"content__wrapper"}>
                        <Switch>
                            <Route exact path='/' component={() => <Dashbord/>}  />
                            <Route exact path='/raporty' component={() => <Raports/>}  />
                            <Route exact path='/planowanie' component={() => <Planning/>}  />
                        </Switch>

                    </div>
                </div>
            </Router>
            )
    }
}

export default Home;