import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Fragment } from "react";

import "index.scss";

import Button from "Components/Button";
storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>Disabled</Button>
  ));

import DayListItem from "Components/DayListItem"
storiesOf("DayListItem", module) //Initiates Storybook and registers our DayListItem component
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  }) // Provides the default background color for our component
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />) // To define our stories, we call add() once for each of our test states to generate a story
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} /> // action() allows us to create a callback that appears in the actions panel when clicked
  ));

import DayList from "Components/DayList"
const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];
storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} day={"Monday"} setDay={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
  ));

import InterviewerItem from "Components/InterviewerItem";
const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};
storiesOf("InterviewerItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => (
    <InterviewerItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={action("setInterviewer")}
    />
  ));

import InterviewerList from "Components/InterviewerList";
const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];
storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
      setInterviewer={action("setInterviewer")}
    />
  ))
  .add("Preselected", () => (
    <InterviewerList
      interviewers={interviewers}
      interviewer={3}
      setInterviewer={action("setInterviewer")}
    />
  ))
  .add("Clickable", () => (
    <InterviewerItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={event => action("setInterviewer")(interviewer.id)}
    />
  ));

import Appointment from "Components/Appointment/Index"
import Header from "Components/Appointment/Header";
import Empty from "Components/Appointment/Empty";
import Show from "Components/Appointment/Show";
import Confirm from "Components/Appointment/Confirm";
import Status from "Components/Appointment/Status";
import Error from "Components/Appointment/Error"
import Form from "Components/Appointment/Form"
storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Appointment", () => <Appointment />)
  .add("Appointment with Time", () => <Appointment time="12PM" />)
  .add("Header", () => <Header time="12PM" />)
  .add("Empty", () => <Empty onAdd={action("onAdd")} />)
  .add("Show", () =>
    <Show student={"Lydia"} interviewer={interviewer.name} onEdit={action("onEdit")} onDelete={action("onDelete")} />)
  .add("Confirm", () =>
    <Confirm message={"Delete the appointment?"} onConfirm={action("onConfirm")} onCancel={action("onCancel")} />)
  .add("Status", () => <Status message={"Deleting"} />)
  .add("Error", () => <Error message={"Could not delete appointment"} onClose={action("onClose")} />)
  .add("Create", () => <Form interviewers={interviewers} onSave={action("onSave")} onCancel={action("onCancel")} />)
  .add("Edit", () => <Form interviewers={interviewers} onSave={action("onSave")} onCancel={action("onCancel")} />)
  .add("Appointment Empty", () => (
    <Fragment>
      <Appointment id={1} time="12PM" />
      <Appointment id="last" time="1PM" />
    </Fragment>
  ))