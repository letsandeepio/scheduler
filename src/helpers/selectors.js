export function getAppointmentsForDay(state, day) {
  const matchedDay = state.days.find((d) => d.name === day);
  return matchedDay
    ? matchedDay.appointments.map((id) => state.appointments[id])
    : [];
}

/* export function getAppointmentsForDay2(state, day) {
  let appointmentsForDay = [];
  const matchedDay = state.days.find((d) => d.name === day);
  if (matchedDay) {
    matchedDay.appointments.forEach((id) => {
      appointmentsForDay.push(state.appointments[id]);
    });
  }
  return appointmentsForDay;
}

matchedDay.appointments.map((id) => state.appointments[id]); */
