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

  function reset() {
    setInterviewer(null);
    setName('');
  }

  function cancel() {
    reset();
    onCancel();
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault}>
          <input
            className="appointment__create-input text--semi-bold"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </form>
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

          {interviewer && name ? (
            <Button confirm onClick={() => onSave(name, interviewer)}>
              Save
            </Button>
          ) : (
            <Button confirm disabled>
              Save
            </Button>
          )}
        </section>
      </section>
    </main>
  );
}
