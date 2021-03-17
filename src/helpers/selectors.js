export function getAppointmentsForDay(state, day) {
  let appointmentsArr = [];

  const filteredDay = state.days.filter((dayObj) => dayObj.name === day);

  if (filteredDay.length > 0) {
    for (const appointmentId of filteredDay[0].appointments) {
      appointmentsArr.push(state.appointments[appointmentId]);
    }
  }

  return appointmentsArr;
}
