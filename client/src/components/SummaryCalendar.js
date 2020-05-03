import React from "react";
import DayPicker from "react-day-picker";
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
    var d = new Date(day);

    for (let i = 0; i < this.props.coursesInfos.length; i++) {
      if (this.props.coursesInfos[i].expiration_date != null) {
        var checkDate = new Date(this.props.coursesInfos[i].expiration_date);

        if (
          checkDate.getFullYear() === d.getFullYear() &&
          checkDate.getMonth() === d.getMonth() &&
          checkDate.getDate() === d.getDate()
        ) {
          window.location.href =
            "/collaborators/" + this.props.coursesInfos[i].collaborator_id;
        }
      }
    }
  }

  componentWillMount() {
    this.props.fetchDates();
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
