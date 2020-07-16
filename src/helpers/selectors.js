export function getAppointmentsForDay(state, day) {
  const matchedDay = state.days.find((d) => d.name === day); //find day object that matches the day provided.
  return matchedDay //if we find the matched day.
    ? matchedDay.appointments.map((id) => state.appointments[id]) //we return the appointments for the day provided from the global state object.
    : []; //else retun an empty array object
}

export function getInterview(state, interview) {
  return interview //if valid interview ibject is is provided
    ? { ...interview, interviewer: state.interviewers[interview.interviewer] } //return the object interviewer object from global state usin the id from the interview object
    : null; //else return null
}

export function getInterviewersForDay(state, day) {
  const matchedDay = state.days.find((d) => d.name === day); //find day object that matches the day provided.
  return matchedDay //if we find the matched day
    ? matchedDay.interviewers.map((id) => state.interviewers[id]) //we return the interviewers for the given day from the global state
    : []; //relse return an empty array
}
