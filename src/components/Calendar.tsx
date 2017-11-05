import * as React from 'react'

import './Calendar.scss'

type Event = {
  end: {
    dateTime: string,
  },
  start: {
    dateTime: string,
  },
  location: string,
  summary: string,
  updated: string,
  description?: string,
}

type CalendarData = Array<Event>;

const calendarData: CalendarData = require('../calendar.json').data;

const Header: React.StatelessComponent = () => {
  
  return (
    <div className="calendar__container">
      <div className="calendar__header">
        <div className="calendar__count">{calendarData.length} upcoming event{calendarData.length > 1 ? 's' : null}</div>
      </div>
      <div className="calendar__list">
        {calendarData.map(event => {
          const startDate = new Date(event.start.dateTime);
          const month = startDate.toLocaleString('en-us', { month: "short" });
          const day = startDate.toLocaleString('en-us', { day: "numeric" });

          // Default calendar type to social
          let type = 'social';

          // Super-basic, but good enough for now:
          if (event.summary.toLowerCase().indexOf('workshop') !== -1) {
            type = 'workshops';
          } else if (event.summary.toLowerCase().indexOf('speaker') !== -1) {
            type = 'speakers';
          }

          return (
            <div key={event.start.dateTime} className={'calendar__event calendar__event--' + type}>
              <div className="calendar__event-dashes" />
              <div className="calendar__event-date">
                <div className="calendar__event-month">{month}</div>
                <div className="calendar__event-day">{day}</div>
              </div>
              <div className="calendar__event-content">
                <h1 className="calendar__event-title">{event.summary}</h1>
                <h2 className="calendar__event-meta">7pm  ·  {event.location}</h2>
                <p className="calendar__event-description">{event.description}</p>
              </div>
              <div className="calendar__event-icon"></div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Header
