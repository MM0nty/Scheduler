import React from "react";
import DayList from "./DayList";
import Appointment from "./Appointment/Index";
import { getAppointments, getInterview, getInterviewers } from "Helpers/Selectors";
import "Components/Application.scss";
import useApplicationData from "Hooks/useApplicationData";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData()
  const appointments = getAppointments(state, state.day)
  const interviewers = getInterviewers(state, state.day)
  const schedule = appointments.map(appointment => <Appointment key={appointment.id} {...appointment} interviewers={interviewers} bookInterview={bookInterview} cancelInterview={cancelInterview} interview={getInterview(state, appointment.interview)} />)

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5PM" />
      </section>
    </main>
  );
}
