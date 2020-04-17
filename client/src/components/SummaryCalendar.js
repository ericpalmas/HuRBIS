import React from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDays: [],
    };
  }

  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state;
    if (selected) {
      const selectedIndex = selectedDays.findIndex((selectedDay) =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    this.setState({ selectedDays });
  }

  render() {
    return (
      <div id="calendar">
        {/* <DayPicker
          selectedDays={this.state.selectedDays}
          onDayClick={this.handleDayClick}

        /> */}

        <DayPicker
          initialMonth={new Date(2017, 3)}
          selectedDays={[
            new Date(2017, 3, 12),
            new Date(2017, 3, 2),
            {
              after: new Date(2017, 3, 20),
              before: new Date(2017, 3, 25),
            },
          ]}
        />
      </div>
    );
  }
}
