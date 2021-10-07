import React from "react";
import "Components/InterviewerList.scss"
import InterviewerItem from "./InterviewerItem";
import PropTypes from "prop-types"

export default function InterviewerList(props) {
  const parsedInterviewers = props.interviewers.map(interviewer =>
    <InterviewerItem key={interviewer.id} name={interviewer.name} selected={interviewer.id === props.interviewer} avatar={interviewer.avatar} setInterviewer={() => props.setInterviewer(interviewer.id)} />)
  /*
  const parsedInterviewers = props.interviewers.map(value =>
  <InterviewerItem key={value.id} name={value.name} selected={value.id === props.value} avatar={value.avatar} onChange={() => props.onChange(value.id)}/>)
  */

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};