import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { 
    Route,
    Switch
 } from 'react-router-dom';
import Loadable from 'react-loadable';

import Loading from './loading';

import Nav from './nav';

const Month = Loadable({
    loader: () => import('./month'),
    loading: Loading
})
const Day = Loadable({
    loader: () => import('./day'),
    loading: Loading
})


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            calendars: [
                {
                    name: "academic",
                    display: true,
                    url: "https://calendar.fhsu.edu/RSSFeeds.aspx?data=rWVImWG4wi1iC5u2UcXAOb8FAG2a07ELhe0%2f79KIsjgOP%2f%2fE87H1iQ%3d%3d"
                },
                {
                    name: "digital",
                    display: true,
                    url: "https://calendar.fhsu.edu/RSSFeeds.aspx?data=3p3oPLk3vPIqlgR7GVicJYQuJxY1OCzM97FjikSX%2bfPyx%2fnOHh7rLQ%3d%3d"
                },
                {
                    name: "homepage",
                    display: true,
                    url: "https://calendar.fhsu.edu/RSSFeeds.aspx?data=OiNeXA6LJItp%2bLkkMsbi4%2bPVrb3VEhe9vR0oDutudvAYkWc22Js4jQ%3d%3d"
                },
                {
                    name: "library",
                    display: true,
                    url: "https://calendar.fhsu.edu/RSSFeeds.aspx?data=HwqQnFd0XZw2ELTJ3w4YjU6UcEQwCtIkCdXhB2QCYYk%3d"
                },
                {
                    name: "music",
                    display: true,
                    url: "https://calendar.fhsu.edu/RSSFeeds.aspx?data=VXLCORHhDCF9BYlLwAXiIJtZ%2b84zYJyGUMAD%2fk3QtUn%2fBE83uXK6n1F%2bO557hWXI"
                },
                {
                    name: "events",
                    display: true,
                    url: "https://calendar.fhsu.edu/RSSFeeds.aspx?data=E6dodmaNJ5NKdXCNLg2VPnz%2bNzo6OZOCKwjPSx%2bl9i1SNyXLy2cgJ81j7Cbdnsmf"
                },
                {
                    name: "tests",
                    display: true,
                    url: "https://calendar.fhsu.edu/RSSFeeds.aspx?data=lnMl0JholnLqY4bB7FYDfVBYQZIjFZKcxd4ttn%2fXLoI%3d"
                },
                {
                    name: "union",
                    display: true,
                    url: "https://calendar.fhsu.edu/RSSFeeds.aspx?data=mL1noRCrG1I%2fLTuo7OuVK%2f5NH%2bUtuXOm"
                }
            ]
        };
    }
    render() {
        return(
            <div>
                <Switch>
                    <Route path="/:mode(week|day)/:year/:month/:day" render={(props) => <Nav {...props} that={this}/>}/>
                    <Route path="/:mode(month)/:year/:month" render={(props) => <Nav {...props} that={this}/>}/>
                    <Route render={(props) => <Nav {...props} that={this}/>}/>
                </Switch>
                <div className="container">
                    <Switch>
        <Route exact path="/" render={(props) => <Month {...props} calendars={this.state.calendars} />}/>
                        <Route path="/month/:year/:month" render={(props) => <Month {...props} calendars={this.state.calendars} />}/>
                        <Route path="/month" render={(props) => <Month {...props} calendars={this.state.calendars} />}/>
                        <Route path="/day/:year/:month/:day" component={Day}/>
                        <Route path="/day" component={Day}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default hot(module)(App);