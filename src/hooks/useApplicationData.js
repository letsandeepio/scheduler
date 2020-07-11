import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  console.log('from hook', state);

  useEffect(() => {
    const getDays = axios.get(`http://localhost:8001/api/days`);
    const getAppointments = axios.get(`http://localhost:8001/api/appointments`);
    const getInterviewers = axios.get(`http://localhost:8001/api/interviewers`);
    Promise.all([getDays, getAppointments, getInterviewers]).then((res) => {
      setState((prev) => ({
        ...prev,
        days: res[0].data,
        appointments: res[1].data,
        interviewers: res[2].data
      }));
    });
  }, []);

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  async function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    await axios.put(
      `http://localhost:8001/api/appointments/${id}`,
      appointment
    );
    setState({ ...state, appointments });
  }

  async function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = { ...state.appointments, [id]: appointment };
    await axios.delete(`http://localhost:8001/api/appointments/${id}`);
    setState({ ...state, appointments });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
