import { useState, useEffect } from "react"
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({ day: "Monday", days: [], appointments: {}, interviewers: {} });
  const setDay = day => setState({ ...state, day: day })

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const findDay = state.days.findIndex((day) => //each day gets {...day}
      day.appointments.includes(id))
    let day
    if (!state.appointments[id].interview) {
      //if null, booking possible and success
      day = { ...state.days[findDay], spots: state.days[findDay].spots - 1 }
    }
    const days = [...state.days]
    if (day) {
      days.splice(findDay, 1, day)
    }
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() =>
        setState({ ...state, appointments, days }))
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const findDay = state.days.findIndex((day) => //each day gets {...day}
      day.appointments.includes(id))
    let day
    if (state.appointments[id].interview) {
      //if not null, cancelling possible and success
      day = { ...state.days[findDay], spots: state.days[findDay].spots + 1 }
    }
    const days = [...state.days]
    if (day) {
      days.splice(findDay, 1, day)
    }
    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() =>
        setState({ ...state, appointments, days }))
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, []);

  return { state, setDay, bookInterview, cancelInterview }
}