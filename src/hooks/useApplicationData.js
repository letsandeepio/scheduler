import { useReducer, useEffect } from 'react';
import axios from 'axios';

const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';

function reducer(state, { type, day, days, appointments, interviewers }) {
  switch (type) {
    case SET_DAY:
      return {
        ...state,
        day
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days,
        appointments,
        interviewers
      };
    case SET_INTERVIEW:
      return { ...state, appointments: appointments };
    default:
      throw new Error(`Tried to reduce with unsupported action type: ${type}`);
  }
}

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  async function updateSpots() {
    //const getDays = await axios.get(`http://localhost:8001/api/days`);
    //setState((prev) => ({ ...prev, days: getDays.data }));
  }

  useEffect(() => {
    const getDays = axios.get(`http://localhost:8001/api/days`);
    const getAppointments = axios.get(`http://localhost:8001/api/appointments`);
    const getInterviewers = axios.get(`http://localhost:8001/api/interviewers`);
    Promise.all([getDays, getAppointments, getInterviewers]).then((res) => {
      const days = res[0].data;
      const appointments = res[1].data;
      const interviewers = res[2].data;
      dispatch({
        type: SET_APPLICATION_DATA,
        days,
        appointments,
        interviewers
      });
    });
  }, []);

  const setDay = (day) => dispatch({ type: SET_DAY, day });

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
    //setState({ ...state, appointments });
    dispatch({ type: SET_INTERVIEW, appointments });
    updateSpots();
  }

  async function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = { ...state.appointments, [id]: appointment };
    await axios.delete(`http://localhost:8001/api/appointments/${id}`);
    dispatch({ type: SET_INTERVIEW, appointments });
    updateSpots();
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
