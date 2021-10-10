import React from "react";
import InterviewerItem from "./InterviewerItem";
import PropTypes from "prop-types";

import "Components/InterviewerList.scss";

export default function InterviewerList(props) {
  const parsedInterviewers = props.interviewers.map(interviewer =>
    <InterviewerItem
      key={interviewer.id}
      name={interviewer.name}
      selected={interviewer.id === props.interviewer}
      avatar={interviewer.avatar}
      setInterviewer={() =>
        props.setInterviewer(interviewer.id)
      }
    />);

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  )
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};