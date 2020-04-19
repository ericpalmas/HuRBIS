import React from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { fetchDates } from "../actions/coursesActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class SummaryCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDays: [],
      selectedDay: undefined,
    };
  }

  handleDayClick(day) {
    this.setState({ selectedDay: new Date(day) });
  }

  componentWillMount() {
    this.props.fetchDates();
    this.updateCalendar();
  }

  updateCalendar() {
    this.state.selectedDays = [];
    for (let i = 0; i < this.props.coursesInfos.length; i++) {
      this.state.selectedDays.push(
        new Date(this.props.coursesInfos[i].expiration_date)
      );
    }
  }

  render() {
    this.updateCalendar();
    return (
      <div id="calendar">
        <DayPicker
          onDayClick={this.handleDayClick}
          selectedDays={this.state.selectedDays}
        />
        {this.state.selectedDay ? (
          <p>You clicked {this.state.selectedDay.toLocaleDateString()}</p>
        ) : (
          <p>Please select a day.</p>
        )}
      </div>
    );
  }
}

SummaryCalendar.propTypes = {
  fetchDates: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  coursesInfos: state.courses.dates,
});

export default connect(mapStateToProps, {
  fetchDates,
})(SummaryCalendar);
