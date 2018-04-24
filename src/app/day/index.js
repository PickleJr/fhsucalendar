import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Loading from '../loading';

class Day extends Component {
    constructor(props) {
        super(props);

        let curMonth = props.match.params.month || (new Date()).getMonth();
        let curYear = props.match.params.year || (new Date()).getFullYear();
        let curDay = props.match.params.day || (new Date()).getDate();
        this.state = {
            date: new Date(curYear, curMonth, curDay),
            ready: false,
            entries: {}
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

    render() {
        let date = null;
        if(this.props.match.params.year && this.props.match.params.month && this.props.match.params.day) {
            date = new Date(this.props.match.params.year, this.props.match.params.month, this.props.match.params.day);
        } else {
            date = new Date();
        }
        if(this.state.ready) {
            return(
                <div>
                    <h1>Hello, World!</h1>
                    <p>This is the first paragraph</p>
                    <p>This is the second paragraph</p>
                    <p>This is the day Component!</p>
                    <p>{date.toDateString()}</p>
                </div>
            );
        } else {
            return(<Loading />);
        }
    }
}

export default hot(module)(Day);