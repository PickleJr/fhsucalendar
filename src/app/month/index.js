import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import Day from './day';
import Loading from '../loading';

class Month extends Component {
    constructor(props) {
        super(props);

        let curMonth = props.match.params.month || (new Date()).getMonth();
        let curYear = props.match.params.year || (new Date()).getFullYear();
        this.state = {
            date: new Date(curYear, curMonth),
            ready: false,
            entries: []
        }
    }

    componentDidMount() {
        this.readFeeds(this.props.calendars).then(results => {
        }).catch(error => {
            console.error("There was an error!");
            console.log(error);
        });
    }

    componentWillReceiveProps(nextProps) {
        let curMonth = nextProps.match.params.month || (new Date()).getMonth();
        let curYear = nextProps.match.params.year || (new Date()).getFullYear();
        this.setState({
            date: new Date(curYear, curMonth),
            ready: false,
            entries: []
        });
        this.readFeeds(this.props.calendars).then(results => {
        }).catch(error => {
            console.error("There was an error!");
            console.log(error);
        });
    }

    async readFeeds(calendars) {
        let returns = {};
        for(let i = 0; i < calendars.length; i++) {
            if(calendars[i].display) {
                await $.ajax({
                    url: calendars[i].url,
                    success: function(data) {
                        $(data).find("item").each(function() {
                            let el = $(this);
                            let elDate = new Date(el.find("pubDate")[0].innerHTML);
                            let obj = {};
                            obj.title = el.find("title")[0].innerHTML;
                            obj.description = el.find("description")[0].innerHTML;
                            returns[elDate.getFullYear()] = returns[elDate.getFullYear()] || {};
                            returns[elDate.getFullYear()][elDate.getMonth()] = 
                                returns[elDate.getFullYear()][elDate.getMonth()] || {};
                            
                            returns[elDate.getFullYear()][elDate.getMonth()][elDate.getDate()] =
                                returns[elDate.getFullYear()][elDate.getMonth()][elDate.getDate()] || [];
                            
                            returns[elDate.getFullYear()][elDate.getMonth()][elDate.getDate()].push(obj);
                        });
                    }
                });
            }
        }
        this.setState({
            ready: true,
            entries: returns
        });
    }
    
    buildCalendar(theDate) {
        let firstWeekDayOfMonth = new Date(theDate.getFullYear(), theDate.getMonth(), 1).getDay();
        let lastDayOfMonth = new Date(theDate.getFullYear(), theDate.getMonth() + 1, 0).getDate();
        let dayCouter = 1;
        let weekDayCounter = 0;
        let weeklyResults = [];
        let results = [];
        let keyID = 0;

        let thisDate = this.state.date;
        let theEvents = this.state.entries;
        theEvents[thisDate.getFullYear()] = theEvents[thisDate.getFullYear()] || {};
        theEvents[thisDate.getFullYear()][thisDate.getMonth()] = theEvents[thisDate.getFullYear()][thisDate.getMonth()] || {};
        theEvents[thisDate.getFullYear()][thisDate.getMonth()]

        while(dayCouter <= lastDayOfMonth) {
            let events = theEvents[thisDate.getFullYear()][thisDate.getMonth()][dayCouter] || [];

            if(dayCouter == 1) {

                if(weekDayCounter == firstWeekDayOfMonth) {
                    weeklyResults.push(
                        <Day events={events} key={++keyID}>{dayCouter++}</Day>
                    );
                } else {
                    weeklyResults.push(<Day key={++keyID}></Day>);
                }

            } else {

                weeklyResults.push(<Day events={events} key={++keyID}>{dayCouter++}</Day>);
                
                if(dayCouter - 1 == lastDayOfMonth) {
                    while(weekDayCounter != 6) {
                        weeklyResults.push(<Day key={++keyID}></Day>);
                        weekDayCounter++;
                    }
                }
            }

            if(weekDayCounter++ == 6){
                results.push(<div key={++keyID} className="cal-row">{weeklyResults}</div>);
                weeklyResults = [];
                weekDayCounter = 0;
            }
        }
        return results;
    }

    render() {
        if(this.state.ready){
            return(
                <div id="calendar">
                    <div className="cal-row">
                        <div><span>SUN</span></div>
                        <div><span>MON</span></div>
                        <div><span>TUE</span></div>
                        <div><span>WED</span></div>
                        <div><span>THU</span></div>
                        <div><span>FRI</span></div>
                        <div><span>SAT</span></div>
                    </div>
                    {this.buildCalendar((this.props.match.params.year && this.props.match.params.month) ?
                        new Date(parseInt(this.props.match.params.year), parseInt(this.props.match.params.month))
                        : new Date())}
                </div>
            );
        } else {
            return(<Loading />);
        }
    }
}

export default hot(module)(Month);