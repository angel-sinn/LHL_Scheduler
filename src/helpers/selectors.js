export function getAppointmentsForDay(state, day) {
  let appointmentsArr = [];

  const filteredDay = state.days.filter((dayObj) => dayObj.name === day);

  if (!filteredDay || filteredDay.length < 1) {
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

export function getInterviewersForDay(state, day) {
  let interviewersArr = [];

  const filteredDay = state.days.filter((dayObj) => dayObj.name === day);

  console.log("filteredDay", filteredDay);

  if (!filteredDay || filteredDay.length < 1) {
    return interviewersArr;
  }

  for (const interviewerId of filteredDay[0].interviewers) {
    interviewersArr.push(state.interviewers[interviewerId]);
  }
  console.log("interviewersArr", interviewersArr);

  return interviewersArr;
}
