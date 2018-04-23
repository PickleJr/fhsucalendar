import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';

class Nav extends Component {
    constructor(props) {
        super(props);

        this.handleCalendarChange = this.handleCalendarChange.bind(this);
        this.that = this.props.that;

    }

    findDisplayCalendar(calName) {
        let calendars = this.that.state.calendars;
        for(let i = 0; i < calendars.length; i++) {
            if(calendars[i].name == calName) {
                return calendars[i].display;
            }
        }
        return false;
    }

    handleCalendarChange(event) {
        const target = event.target;
        const value = target.checked;
        const name = target.name;

        let calendars = this.that.state.calendars;
        for(let i = 0; i < calendars.length; i++) {
            if(calendars[i].name == name) {
                calendars[i].display = value;
            }
        }

        this.that.setState({
            calendars: calendars
        });
    }

    componentDidMount() {
        let sidenav = document.querySelector('.sidenav');
        var sidenavInstace = M.Sidenav.init(sidenav, {});

        function swapArrowDirection(elID) {
            var newArrow = $(elID).html() == "arrow_drop_down" ? "arrow_drop_up" : "arrow_drop_down";
            $(elID).html(newArrow);
        }

        $('.dropdown-trigger').dropdown({
            coverTrigger: false
        });
        $('.dropdown-calendar-trigger').dropdown({
            coverTrigger: false,
            constrainWidth: false,
            closeOnClick: false
        });
    }
    render() {
        let months = ["Janruary", "February", "March", "April", "May", "June", "July", "August",
            "September", "October", "November", "December"];
        let path = this.props.location.pathname;
        let month = this.props.match.params.month || (new Date()).getMonth();
        month = months[month];

        let displayAcademicCalendar = this.findDisplayCalendar("academic");
        let displayDigitalCalendar = this.findDisplayCalendar("digital");
        let displayHomepageCalendar = this.findDisplayCalendar("homepage");
        let displayLibraryCalendar = this.findDisplayCalendar("library");
        let displayMusicCalendar = this.findDisplayCalendar("music");
        let displayEventsCalendar = this.findDisplayCalendar("events");
        let displayTestsCalendar = this.findDisplayCalendar("tests");
        let displayUnionCalendar = this.findDisplayCalendar("union");
        return(
            <div>
                <ul className="dropdown-content" id="calendars">
                    <li>
                        <label className="navcheckbox">
                            <input checked={displayAcademicCalendar} name="academic" type="checkbox" onChange={this.handleCalendarChange}/>
                            <span>Academic Calendar</span>
                        </label>
                    </li>
                    <li>
                        <label className="navcheckbox">
                            <input checked={displayDigitalCalendar} name="digital" type="checkbox" onChange={this.handleCalendarChange}/>
                            <span>Digital Signature</span>
                        </label>
                    </li>
                    <li>
                        <label className="navcheckbox">
                            <input checked={displayHomepageCalendar} name="homepage" type="checkbox" onChange={this.handleCalendarChange}/>
                            <span>FHSU Homepage Feed</span>
                        </label>
                    </li>
                    <li>
                        <label className="navcheckbox">
                            <input checked={displayLibraryCalendar} name="library" type="checkbox" onChange={this.handleCalendarChange}/>
                            <span>Library Feed</span>
                        </label>
                    </li>
                    <li>
                        <label className="navcheckbox">
                            <input checked={displayMusicCalendar} name="music" type="checkbox" onChange={this.handleCalendarChange}/>
                            <span>Music Feed</span>
                        </label>
                    </li>
                    <li>
                        <label className="navcheckbox">
                            <input checked={displayEventsCalendar} name="events" type="checkbox" onChange={this.handleCalendarChange}/>
                            <span>Student Events/Activities</span>
                        </label>
                    </li>
                    <li>
                        <label className="navcheckbox">
                            <input checked={displayTestsCalendar} name="tests" type="checkbox" onChange={this.handleCalendarChange}/>
                            <span>Tests</span>
                        </label>
                    </li>
                    <li>
                        <label className="navcheckbox">
                            <input checked={displayUnionCalendar} name="union" type="checkbox" onChange={this.handleCalendarChange}/>
                            <span>Union</span>
                        </label>
                    </li>
                </ul>
                <ul className="dropdown-content" id="months">
                    <li><Link to="/month/2018/0">Janruary</Link></li>
                    <li><Link to="/month/2018/1">February</Link></li>
                    <li><Link to="/month/2018/2">March</Link></li>
                    <li><Link to="/month/2018/3">April</Link></li>
                    <li><Link to="/month/2018/4">May</Link></li>
                    <li><Link to="/month/2018/5">June</Link></li>
                    <li><Link to="/month/2018/6">July</Link></li>
                    <li><Link to="/month/2018/7">August</Link></li>
                    <li><Link to="/month/2018/8">September</Link></li>
                    <li><Link to="/month/2018/9">October</Link></li>
                    <li><Link to="/month/2018/10">November</Link></li>
                    <li><Link to="/month/2018/11">December</Link></li>
                </ul>
                <nav className="nav-wrapper yellow accent-3">
                    <div className="nav-wrapper container">
                        <Link to="/" className="brand-logo hide-on-med-and-down">Calendar</Link>
                        <a href="#" data-target="mobile-nav" className="sidenav-trigger">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="right hide-on-med-and-down">
                            <li className={ path == "/day" ? 'active' : ''}>
                                <Link to="/day">Day</Link>
                            </li>
                            <li className={ path == "/week" ? 'active' : ''}>
                                <Link to="/week">Week</Link>
                            </li>
                            <li className={ (path == "/" || path == '/month') ? 'active' : ''}>
                                <Link to="/">Month</Link>
                            </li>
                        </ul>
                        <ul className="right">
                            <li>
                                <a className="dropdown-calendar-trigger" href="#" data-target="calendars">
                                    Calendars<i className="material-icons right">arrow_drop_down</i>
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-trigger" href="#" data-target="months">
                                    {month}<i className="material-icons right">arrow_drop_down</i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="sidenav" id="mobile-nav">
                    <div id="mobile-nav-header">
                        <span className="left">Calendar</span>
                    </div>
                    <ul>
                        <li className={ path == "/day" ? 'active' : ''}>
                            <Link to="/day" className="sidenav-close">Day</Link>
                        </li>
                        <li className={ path == "/week" ? 'active' : ''}>
                            <Link to="/week" className="sidenav-close">Week</Link>
                        </li>
                        <li className={ (path == "/" || path == '/month') ? 'active' : ''}>
                            <Link to="/" className="sidenav-close">Month</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default hot(module)(Nav);