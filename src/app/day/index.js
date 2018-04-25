import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Redirect } from 'react-router-dom';

import Loading from '../loading';
import Event from './event';

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

        let elem = document.querySelector('.datepicker');
        let instance = M.Datepicker.init(elem, {
            format: "yyyy m d",
            minDate: new Date(),
            maxDate: new Date(this.state.date.getFullYear() + 1, 12, 0),
            i18n: {
                cancel: '',
                done: ''
            },
            onSelect: date => {
                instance.close();
                this.props.history.push('/day/' + date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate());
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        let curMonth = nextProps.match.params.month || (new Date()).getMonth();
        let curYear = nextProps.match.params.year || (new Date()).getFullYear();
        let curDay = nextProps.match.params.day || (new Date()).getDate();
        this.setState({
            date: new Date(curYear, curMonth, curDay),
            ready: false,
            entries: []
        });
        this.readFeeds(this.props.calendars).then(results => {
        }).catch(error => {
            console.error("There was an error!");
            console.log(error);
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let elem = document.querySelector('.datepicker');
        let instance = M.Datepicker.init(elem, {
            format: "yyyy m d",
            minDate: new Date(),
            maxDate: new Date(this.state.date.getFullYear() + 1, 12, 0),
            i18n: {
                cancel: '',
                done: ''
            },
            onSelect: date => {
                instance.close();
                this.props.history.push('/day/' + date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate());
            }
        });
    }

    buildEvents() {
        let returns = [];
        let year = this.state.date.getFullYear();
        let month = this.state.date.getMonth();
        let day = this.state.date.getDate();
        let entries = this.state.entries;

        if (entries[year] && entries[year][month] && entries[year][month][day]) {
            entries = entries[year][month][day];
            for (var i = 0; i < entries.length; i++) {
                returns.push(<Event key={i} event={entries[i]} />)
            }
            returns.push(
                <div key="date-picker" className="c-center date-picker">
                    <a key="date-picker" className="datepicker waves-effect waves-light btn">Choose a different date</a>
                </div>
            );
        } else {
            returns.push(
                <div key="no-display" className="c-center date-picker">
                    <p className="c-center flow-text"> No events to display!</p>
                    <a className="datepicker waves-effect waves-light btn">Choose a different date</a>
                </div>
            );
        }
        return returns;
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
                            obj.title = el.find("title")[0].innerHTML.slice(9, -3);
                            obj.description = el.find("description")[0].innerHTML.slice(9, -3);
                            obj.link = el.find("link")[0].innerHTML;
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
                    {this.buildEvents()}
                </div>
            );
        } else {
            return(<Loading />);
        }
    }
}

export default hot(module)(Day);