export function getAppointmentsForDay(state, day) {
  let appointmentsArr = [];

  const filteredDay = state.days.filter((dayObj) => dayObj.name === day);

  if (!filteredDay.length) {
    return appointmentsArr;
  }

  for (const appointmentId of filteredDay[0].appointments) {
    appointmentsArr.push(state.appointments[appointmentId]);
  }

  return appointmentsArr;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewObj = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };

  return interviewObj;
}
