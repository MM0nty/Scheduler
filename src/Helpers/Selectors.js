export function getAppointments(state, dayInput) {
  const filteredDays = state.days.filter(day => day.name === dayInput);
  const day = filteredDays[0];

  if (!day) {
    return [];
  };

  const filteredAppointments = day.appointments.map(appointment => {
    return state.appointments[appointment];
  });

  return filteredAppointments;
};

export function getInterviewers(state, dayInput) {
  const filteredDays = state.days.filter(day => day.name === dayInput);
  const day = filteredDays[0];

  if (!day) {
    return [];
  };

  const filteredInterviewers = day.interviewers.map(interviewer => {
    return state.interviewers[interviewer];
  });

  return filteredInterviewers;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  };

  const interviewObject = {
    "interviewer":
      state.interviewers[interview.interviewer],
    "student": interview.student
  };
  
  return interviewObject;
}