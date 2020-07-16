import { useReducer, useEffect } from 'react';
import axios from 'axios';
import useRealtimeUpdate from './useRealtimeUpdate.js';

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_DAYS
} from 'reducers/application';

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  useRealtimeUpdate(dispatch, updateSpots); //required to enable realtime updates using websocket IO

  useEffect(() => {
    const getDays = axios.get(`/api/days`);
    const getAppointments = axios.get(`/api/appointments`);
    const getInterviewers = axios.get(`/api/interviewers`);
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

  const setDay = (day) => dispatch({ type: SET_DAY, day }); //utitlity function to update the state with the selected day

  async function updateSpots() {
    //utitlity function to update the current spots available from the server
    const getResponse = await axios.get(`/api/days`);
    const days = getResponse.data;
    dispatch({ type: SET_DAYS, days });
  }

  async function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    await axios.put(`/api/appointments/${id}`, appointment);
  }

  async function cancelInterview(id) {
    await axios.delete(`/api/appointments/${id}`);
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
