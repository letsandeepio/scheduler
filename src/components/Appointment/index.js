import React, { useEffect } from 'react';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';

import useVisualMode from 'hooks/useVisualMode';

import 'components/Appointment/styles.scss';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE ';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

export default function Appointment({
  id,
  time,
  interview,
  interviewers,
  bookInterview,
  cancelInterview
}) {
  const initMode = interview ? SHOW : EMPTY;
  const { mode, transition, back } = useVisualMode(initMode);

  useEffect(() => {
    if (interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (interview === null && mode === SHOW) {
      transition(EMPTY);
    }
  }, [interview, transition, mode]);

  async function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer.id
    };
    transition(SAVING);
    try {
      await bookInterview(id, interview);
      transition(SHOW);
    } catch (error) {
      transition(ERROR_SAVE, true);
    }
  }

  async function onDelete() {
    transition(DELETING, true);
    try {
      await cancelInterview(id);
      transition(EMPTY);
    } catch (error) {
      transition(ERROR_DELETE, true);
    }
  }

  async function onEdit() {
    transition(EDIT);
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {interview && mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          name={interview.student}
          interviewer={interview.interviewer}
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_SAVE && <Error message="Saving" onClose={() => back()} />}
      {mode === ERROR_DELETE && (
        <Error message="Deleting" onClose={() => back()} />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="This action will delete the Appointment. Are you sure?"
          onCancel={back}
          onConfirm={onDelete}
        />
      )}
    </article>
  );
}
