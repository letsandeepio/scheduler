export function getAppointmentsForDay(state, day) {
  const matchedDay = state.days.find((d) => d.name === day);
  return matchedDay
    ? matchedDay.appointments.map((id) => state.appointments[id])
    : [];
}
