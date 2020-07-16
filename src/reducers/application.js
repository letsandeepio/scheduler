/* Custom reducer hook for global state management */

export const SET_DAY = 'SET_DAY';
export const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
export const SET_INTERVIEW = 'SET_INTERVIEW';
export const SET_DAYS = 'SET_DAYS';

export default function reducer(
  state,
  { id, type, day, days, interview, appointments, interviewers }
) {
  switch (type) {
    case SET_DAY: //for updating the current day in the state
      return {
        ...state,
        day
      };
    case SET_APPLICATION_DATA: //update the entire application data
      return {
        ...state,
        days,
        appointments,
        interviewers
      };
    case SET_INTERVIEW: //update the interview object for the given appointment
      const appointment = {
        ...state.appointments[id],
        interview: interview ? { ...interview } : null
      };
      const newAppointments = {
        ...state.appointments,
        [id]: appointment
      };
      return { ...state, appointments: newAppointments };
    case SET_DAYS: //update the days object (for updating the number of spots available for each)
      return { ...state, days };
    default:
      //throw error if dispatch is called with unsupported arguments
      throw new Error(`Tried to reduce with unsupported action type: ${type}`);
  }
}
