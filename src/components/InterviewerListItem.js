import React from 'react';

import 'components/InterviewerListItem.scss';
import className from 'classnames';

export default function InterviewerListItem({
  id,
  name,
  avatar,
  selected,
  setInterviewer
}) {
  let itemClass = className('interviewers__item', {
    'interviewers__item--selected': selected
  });

  return (
    <li className={itemClass} onClick={setInterviewer}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
