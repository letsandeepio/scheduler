export function getAppointmentsForDay(state, day) {
  let appointmentsForDay = [];
  const matchedDay = state.days.find((item) => item.name === day);
  if (matchedDay) {
    matchedDay.appointments.forEach((item) => {
      appointmentsForDay.push(state.appointments[item]);
    });
  }
  return appointmentsForDay;
}
