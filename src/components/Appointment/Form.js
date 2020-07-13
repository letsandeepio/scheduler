import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form({
  name: selectedName,
  interviewer: selectedInterviewer,
  interviewers,
  onSave,
  onCancel
}) {
  const [interviewer, setInterviewer] = useState(selectedInterviewer || null);
  const [name, setName] = useState(selectedName || '');
  const [error, setError] = useState('');

  function reset() {
    setInterviewer(null);
    setName('');
  }

  function cancel() {
    reset();
    onCancel();
  }

  function validate() {
    if (name === '') {
      setError('Student name cannot be blank');
      return;
    }

    onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault}>
          <input
            className="appointment__create-input text--semi-bold"
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>

          <Button confirm onClick={() => validate(name, interviewer)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
