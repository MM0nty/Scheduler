import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day: day });

  function bookInterview(id, interview) {
    // updates interview object
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    // updates appointments array
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // finds the day's schedule
    const daysSchedule = state.days.findIndex((day) =>
      day.appointments.includes(id));
    let day;

    // books appointment if interview is null
    if (!state.appointments[id].interview) {
      day = {
        ...state.days[daysSchedule],
        spots: state.days[daysSchedule].spots - 1
      };
    };
    
    // edits appointments if interview is not null
    if (state.appointments[id].interview) {
      day = { ...state.days[daysSchedule] };
    };

    const days = [...state.days];

    days.splice(daysSchedule, 1, day); // updates spots remaining

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() =>
        setState({ ...state, appointments, days }));
  };

  function cancelInterview(id) {
    // updates interview object
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    // updates appointments array
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // finds the day's schedule
    const daysSchedule = state.days.findIndex((day) =>
      day.appointments.includes(id));
    let day;

    // cancels appointment if interview is not null
    if (state.appointments[id].interview) {
      day = {
        ...state.days[daysSchedule],
        spots: state.days[daysSchedule].spots + 1
      };
    };
    const days = [...state.days];

    days.splice(daysSchedule, 1, day); // updates spots remaining

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() =>
        setState({ ...state, appointments, days }));
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}