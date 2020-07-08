import React, { useState, useEffect } from 'react';

import axios from 'axios';

import 'components/Application.scss';

import DayList from 'components/DayList';
import Appointment from 'components/Appointment';

const appointments = [
  {
    id: 1,
    time: '12pm'
  },
  {
    id: 2,
    time: '1pm',
    interview: {
      student: 'Lydia Miller-Jones',
      interviewer: {
        id: 1,
        name: 'Sylvia Palmer',
        avatar: 'https://i.imgur.com/LpaY82x.png'
      }
    }
  },
  {
    id: 3,
    time: '2pm',
    interview: {
      student: 'King John IV',
      interviewer: {
        id: 1,
        name: 'Rockstar Baby',
        avatar: 'https://i.imgur.com/T2WwVfS.png'
      }
    }
  },
  {
    id: 4,
    time: '3pm',
    interview: {
      student: 'Frodo',
      interviewer: {
        id: 1,
        name: 'Balbir Singh',
        avatar: 'https://i.imgur.com/FK8V841.jpg'
      }
    }
  },
  {
    id: 5,
    time: '4pm',
    interview: {
      student: 'Dwayne Johnson',
      interviewer: {
        id: 1,
        name: 'Peter Parker',
        avatar: 'https://i.imgur.com/twYrpay.jpg'
      }
    }
  }
];

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  useEffect(() => {
    const getDays = axios.get(`http://localhost:8001/api/days`);
    const getAppointments = axios.get(`http://localhost:8001/api/appointments`);
    Promise.all([getDays, getAppointments]).then((res) => {
      console.log(res[0].data);
      console.log(res[1].data);
      setState((prev) => ({
        ...prev,
        days: res[0].data,
        appointments: res[1].data
      }));
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map((appointment) => {
          return <Appointment {...appointment} />;
        })}
        <Appointment time="5pm" />
      </section>
    </main>
  );
}
