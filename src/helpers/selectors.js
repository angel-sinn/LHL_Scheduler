export function getAppointmentsForDay(state, day) {
  let appointmentsArr = [];

  const dayObj = state.days.find((item) => item.name === day);

  if (!dayObj) {
    return appointmentsArr;
  }

  for (const appointmentId of dayObj.appointments) {
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

export function getInterviewersForDay(state, day) {
  let interviewersArr = [];

  const dayObj = state.days.find((item) => item.name === day);

  if (!dayObj) {
    return interviewersArr;
  }

  for (const interviewerId of dayObj.interviewers) {
    interviewersArr.push(state.interviewers[interviewerId]);
  }

  return interviewersArr;
}
