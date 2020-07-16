export const SET_DAY = 'SET_DAY';
export const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
export const SET_INTERVIEW = 'SET_INTERVIEW';
export const SET_DAYS = 'SET_DAYS';

export default function reducer(
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
      //console.log('appointments' + JSON.stringify(newAppointments));
      return { ...state, appointments: newAppointments };
    case SET_DAYS:
      return { ...state, days };
    default:
      throw new Error(`Tried to reduce with unsupported action type: ${type}`);
  }
}
