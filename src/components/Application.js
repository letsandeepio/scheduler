import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { getAppointmentsForDay } from 'helpers/selectors';

import 'components/Application.scss';

import DayList from 'components/DayList';
import Appointment from 'components/Appointment';

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  const appointments = getAppointmentsForDay(state, state.day);

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
