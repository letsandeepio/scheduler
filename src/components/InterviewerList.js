import React from 'react';
import InterviewerListItem from 'components/InterviewerListItem';

import 'components/InterviewerList.scss';

export default function InterviewerList({ interviewers, value, onChange }) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((interviewerItem) => {
          return (
            <InterviewerListItem
              key={interviewerItem.id}
              {...interviewerItem}
              setInterviewer={(e) => onChange(interviewerItem.id)}
              selected={interviewerItem.id === value}
            />
          );
        })}
      </ul>
    </section>
  );
}
