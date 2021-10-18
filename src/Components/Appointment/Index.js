import React from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "Hooks/useVisualMode";

import "Components/Appointment/Styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
    //cancel on edit goes back to error
  };

  function destroy() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  };

  return (
    //Appointment statuses
    <article className="appointment">
      <Header time={props.time} />
      {props.bookInterview}

      {mode === EMPTY &&
        <Empty onAdd={() => transition(CREATE)} />
      }

      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      }

      {mode === SAVING &&
        <Status message="Saving" />
      }

      {mode === ERROR_SAVE &&
        <Error
          message="Error while saving"
          onClose={back}
        />
      }

      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      }

      {mode === EDIT &&
        <Form
          student={props.student}
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onCancel={back}
          onSave={save}
        />
      }

      {mode === CONFIRM &&
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={destroy}
        />
      }

      {mode === DELETING &&
        <Status message="Deleting" />
      }

      {mode === ERROR_DELETE &&
        <Error
          message="Error while deleting"
          onClose={() => transition(SHOW)}
        />
      }
    </article>
  )
}