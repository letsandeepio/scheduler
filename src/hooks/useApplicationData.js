import { useReducer, useEffect } from 'react';
import axios from 'axios';

const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';
const SET_DAYS = 'SET_DAYS';

function reducer(
  state,
  { id, type, day, days, interview, appointments, interviewers }
) {
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
      //console.log('interview' + JSON.stringify(interview));

      const appointment = {
        ...state.appointments[id],
        interview: interview ? { ...interview } : null
      };
      const newAppointments = {
        ...state.appointments,
        [id]: appointment
      };
      console.log('appointments' + JSON.stringify(newAppointments));
      return { ...state, appointments: newAppointments };
    case SET_DAYS:
      return { ...state, days };
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

  useEffect(() => {
    let exampleSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    exampleSocket.onopen = () => {
      exampleSocket.send('ping');
    };
    exampleSocket.onmessage = (event) => {
      if (event.data.includes('SET_INTERVIEW')) {
        console.log('server' + event.data);
        dispatch(JSON.parse(event.data));
      }
    };
  }, []);

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

  async function updateSpots() {
    const getResponse = await axios.get(`http://localhost:8001/api/days`);
    const days = getResponse.data;
    dispatch({ type: SET_DAYS, days });
  }

  async function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    await axios.put(
      `http://localhost:8001/api/appointments/${id}`,
      appointment
    );
    //console.log({ type: SET_INTERVIEW, interview, id });
    //dispatch({ type: SET_INTERVIEW, interview, id });
    updateSpots();
  }

  async function cancelInterview(id) {
    await axios.delete(`http://localhost:8001/api/appointments/${id}`);
    //dispatch({ type: SET_INTERVIEW, interview, id });
    updateSpots();
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
